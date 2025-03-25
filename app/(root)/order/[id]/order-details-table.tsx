"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { createPayPalOrder, approvePayPalOrder } from "@/lib/actions/order.actions";

const OrderDetailsTable = ({ order, paypalClientId }: { order: Order; paypalClientId: string }) => {
  const {
    id,
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
  } = order;

  const { toast } = useToast();

  const PrintLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();
    let status = "";

    if (isPending) {
      status = "Loading PayPal...";
    } else if (isRejected) {
      status = "Error loading PayPal";
    }

    return status;
  };

  const handleCreatePayPalOrder = async () => {
    const response = await createPayPalOrder(order.id);

    if (!response.success) {
      toast({
        variant: "destructive",
        description: response.message,
      });
    }

    return response.data;
  };

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const response = await approvePayPalOrder(order.id, data);

    toast({
      variant: response.success ? "default" : "destructive",
      description: response.message,
    });
  };

  return (
    <>
      <h1 className='py-4 text-2xl'>Order {formatId(id)}</h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='col-span-2 space-y-4 overflow-x-auto'>
          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Payment Method</h2>
              <p className='mb-2'>{paymentMethod}</p>
              {isPaid ? (
                <Badge variant='secondary'>Paid at {formatDateTime(paidAt!).dateTime}</Badge>
              ) : (
                <Badge variant='destructive'>Not Paid</Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p className='mb-2'>
                {shippingAddress.streetAddress}, {shippingAddress.city}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge variant='secondary'>Delivered at {formatDateTime(deliveredAt!).dateTime}</Badge>
              ) : (
                <Badge variant='destructive'>Not Delivered</Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 gap-4'>
              <h1 className='text-xl pb-4'>Order Items</h1>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orderitems.map((item) => (
                    <TableRow key={item.slug}>
                      {/* Product Image & Name Cell */}
                      <TableCell>
                        <Link href={`/product/${item.slug}`} className='flex items-center'>
                          <Image src={item.image} alt={item.name} width={50} height={50} />
                          <span className='px-2'>{item.name}</span>
                        </Link>
                      </TableCell>

                      {/* Quantity Cell */}
                      <TableCell>
                        <span className='px-2'>{item.qty}</span>
                      </TableCell>

                      {/* Price Cell */}
                      <TableCell>
                        <span className='px-2'>${item.price}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className='p-4 gap-4 space-y-4'>
              <div className='flex justify-between'>
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>

              <div className='flex justify-between'>
                <div>Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>

              <div className='flex justify-between'>
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>

              <div className='flex justify-between'>
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>

              {/* PayPal Payment */}
              {!isPaid && paymentMethod === "PayPal" && (
                <div>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PrintLoadingState />
                    <PayPalButtons createOrder={handleCreatePayPalOrder} onApprove={handleApprovePayPalOrder} />
                  </PayPalScriptProvider>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
