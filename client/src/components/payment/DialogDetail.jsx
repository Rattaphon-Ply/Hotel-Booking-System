import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getPaymentDetail } from "@/api/payments";
import { Spinner } from "@/components/ui/spinner";
import useStore from "@/store/store";

const DialogDetail = ({ booking }) => {
  const token = useStore((s) => s.token);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (open) {
      fetchPaymentDetail();
    }
  }, [open]);

  const fetchPaymentDetail = async () => {
    setLoading(true);
    try {
      const res = await getPaymentDetail(token, booking.payment.id);
      setPayment(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!booking.payment) {
    return null; // ถ้า booking ยังไม่มี payment ไม่ต้อง render Dialog
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">ดูรายละเอียดการชำระเงิน</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-lg z-10">
            <Spinner className="w-6 h-6" />
          </div>
        )}

        <DialogHeader>
          <DialogTitle>รายละเอียดการชำระเงิน</DialogTitle>
          <DialogDescription>
            รายการจอง: {booking.room?.name} <br />
            จำนวนเงิน: {booking.totalPrice.toLocaleString()} บาท
          </DialogDescription>
        </DialogHeader>

        {payment && (
          <div className="mt-4 p-2 border rounded bg-gray-50 text-sm text-gray-700 space-y-2">
            <p>
              💳 สถานะการชำระเงิน: <span>{payment.status}</span>
            </p>
            <p>
              หมายเลขอ้างอิง:{" "}
              <span>{payment.transactionId || `Payment-${payment.id}`}</span>
            </p>
            <p>วิธีการชำระเงิน: {payment.method}</p>
            <p>วันที่ชำระ: {new Date(payment.createdAt).toLocaleString("th-TH")}</p>
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            ปิด
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetail;
