import { requireAdmin } from "@/lib/auth-guard";
import { getAllOrders } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import Link from "next/link";
import Pagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Orders",
};

const AdminOrdersPage = async (props: { searchParams: Promise<{ page: string }> }) => {
  await requireAdmin();

  const { page = 1 } = await props.searchParams;

  const orders = await getAllOrders({
    page: Number(page),
  });

  return (
    <div className='space-y-2'>
      <h1 className='h2-bold'>Orders</h1>

      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt ? formatDateTime(order.paidAt).dateTime : "Not Paid"}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : "Not Delivered"}
                </TableCell>
                <TableCell>
                  <Button asChild variant='outline' size='sm'>
                    <Link href={`/order/${order.id}`}>Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {orders.totalPages > 1 && <Pagination page={Number(page) || 1} totalPages={orders?.totalPages} />}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
