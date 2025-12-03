import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getListPayments } from "@/api/admin";
import useStore from "@/store/store";

const ListPayments = () => {
    const token = useStore((s)=>s.token)

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getListPayments(token) // backend endpoint
        setPayments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner />
      </div>
    );
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Payments Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-gray-50">
                  <TableCell>{payment.transactionId}</TableCell>
                  <TableCell>{payment.booking.user.name}</TableCell>
                  <TableCell>{payment.booking.user.email}</TableCell>
                  <TableCell>{payment.booking.room.name}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        payment.status === "PAID" ? "default" : "destructive"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(payment.createdAt).toLocaleDateString()}{" "}
                    {new Date(payment.createdAt).toLocaleTimeString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default ListPayments;
