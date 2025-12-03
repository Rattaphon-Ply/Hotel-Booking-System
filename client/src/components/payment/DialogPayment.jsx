import { useState } from "react";
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
import { createPayment } from "@/api/payments";
import { Spinner } from "@/components/ui/spinner";
import useStore from "@/store/store";
import { toast } from "sonner";

const DialogPayment = ({ booking, onSuccess }) => {
  const token = useStore((s) => s.token);
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState("PROMPTPAY");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await createPayment(token, {
        bookingId: booking.id,
        method,
        amount: booking.totalPrice,
      });

      onSuccess(); // refresh list
      toast.success(res.data.message)
      setOpen(false);
    } catch (err) {
      toast("ชำระเงินล้มเหลว")
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white">ชำระเงิน</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-lg">
            <Spinner className="w-6 h-6" />
          </div>
        )}

        <DialogHeader>
          <DialogTitle>ชำระเงิน</DialogTitle>
          <DialogDescription>
            รายการจอง: {booking.room?.name} <br />
            จำนวนเงิน: {booking.totalPrice.toLocaleString()} บาท
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <label className="font-medium">วิธีการชำระเงิน</label>
          <select
            className="w-full p-2 border rounded"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="PROMPTPAY">PromptPay</option>
            <option value="CASH">เงินสด</option>
            <option value="CREDIT_CARD">บัตรเครดิต</option>
            <option value="BANK_TRANSFER">โอนผ่านธนาคาร</option>
          </select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            ยกเลิก
          </Button>
          <Button onClick={handlePayment} disabled={loading}>
            ยืนยันการชำระเงิน
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPayment;
