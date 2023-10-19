import { postData } from "@/lib/hooks/helpers";

export const renderSubscriptionButton = ({ session, router }) => {
  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center my-2">
      <p className="pb-4 sm:pb-0 text-sm text-center">
        Manage your subscription on Stripe.
      </p>
      <button
        className="button rounded primary bg-zinc-700 rounded-small border border-zinc-600 hover:bg-zinc-900 hover:border-zinc-700 block w-36 text-white ease-in-out duration-300 text-sm p-1.5"
        disabled={!session}
        onClick={() => redirectToCustomerPortal(router)}
      >
        Manage
      </button>
    </div>
  );
};

export const redirectToCustomerPortal = async (router: any) => {
  try {
    const { url } = await postData({
      url: "/api/create-portal-link",
    });
    router.push(url);
  } catch (error) {
    if (error) return alert((error as Error).message);
  }
};

export default renderSubscriptionButton;
