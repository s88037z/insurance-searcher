import { useForm, SubmitHandler } from "react-hook-form";
import { PolicyholderSearchKeys } from "../types";

export type ISearcherForm = {
  [key in PolicyholderSearchKeys]: string;
};
type PolicyholderSearcherProps = {
  onSubmit: SubmitHandler<ISearcherForm>;
};

export default function PolicyholderSearcher({
  onSubmit,
}: PolicyholderSearcherProps) {
  const { register, handleSubmit } = useForm<ISearcherForm>();

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center">
        <input
          className="block w-full rounded-lg border border-gray-500 bg-white px-5 py-2 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300"
          {...register(PolicyholderSearchKeys.Code)}
          placeholder="Enter Policyholder Code"
        />
        <input
          className="ml-4 transform cursor-pointer rounded-lg bg-blue-600 px-6 py-2 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          type="submit"
          value={"Search"}
        />
      </div>
    </form>
  );
}
