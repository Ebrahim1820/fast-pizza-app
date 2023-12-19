/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

// eslint-disable-next-line no-unused-vars
function UpdateOrder({ order }) {
  // in order to update data after subittingg
  // we use useFetcher
  const fetcher = useFetcher();

  //   useEffect(function () {
  //     fetcher.fo();
  //   }, []);

  return (
    <fetcher.Form method="PATCH" className=" text-right">
      <Button type="primary" color="bg-yellow-400">
        Make Priority
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  //   const formData = await request.formData();
  //   const data = Object.fromEntries(formData);

  const data = { priority: true };

  await updateOrder(params.orderId, data);
  return null;
}
