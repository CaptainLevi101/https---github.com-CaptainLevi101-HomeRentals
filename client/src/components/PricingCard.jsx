import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";



const PricingCard = ({ startDate, endDate, price, dayCount,handleSubmit }) => {
    return (
        <Card color="gray" variant="gradient" 
        className=" w-[500px] p-8 mt-8 ">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
            >
                <Typography
                    variant="small"
                    color="white"
                    className="font-normal uppercase"
                >
                    Total
                </Typography>
                <Typography
                    variant="h1"
                    color="white"
                    className="mt-2 flex justify-center gap-1 text-7xl font-normal"
                >
                    <span className="mt-2 text-4xl">$</span>{price * dayCount}{" "}
                </Typography>
            </CardHeader>
            <CardBody className="p-0">
                <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-4">
                        <Typography className="font-normal">
                            {dayCount > 1 ? (
                                <h2>
                                    ${price} x {dayCount} nights
                                </h2>
                            ) : (
                                <h2>
                                    ${price} x {dayCount} night
                                </h2>
                            )}
                        </Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <Typography className="font-normal">StartDate:{startDate}</Typography>
                    </li>
                    <li className="flex items-center gap-4">

                        <Typography className="font-normal">End Date:{endDate}</Typography>
                    </li>
                </ul>
            </CardBody>
            <CardFooter className="mt-12 p-0">
                <Button
                    size="lg"
                    color="white"
                    className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                    ripple={false}
                    fullWidth={true}
                    onClick={handleSubmit}
                >
                    Booking
                </Button>
            </CardFooter>
        </Card>
    );
}

export default PricingCard;