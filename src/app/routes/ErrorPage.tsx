import { Link } from "@/components/ui/Link";
import { toErrorString } from "@/utils/error";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const errorMsg = toErrorString(error);
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1 className="mb-4 text-3xl">Oops!</h1>
      <p className="mb-2 text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="mb-2 text-xl text-red-500">
        <i>{errorMsg}</i>
      </p>
      <Link className="text-xl" to="/" replace>
        Go to Home
      </Link>
    </div>
  );
}
