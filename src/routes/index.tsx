import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { commentsQueryOptions } from "~/queries/comments";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [id, setId] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <form
        className="p-6 flex flex-col gap-8 max-w-[800px] mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.target as HTMLFormElement);
          setId(fd.get("id") as string);
        }}
      >
        <div className="flex flex-col gap-2 items-center">
          <button
            onClick={() => {
              if (ref.current) {
                ref.current.value = "0e5cb2f3-4994-4919-8b43-63342fcfd371";
              }
            }}
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-md inset-ring inset-ring-gray-300 hover:bg-gray-50"
          >
            kommunal.info
            <span className="text-gray-500 ml-2">
              [0e5cb2f3-4994-4919-8b43-63342fcfd371]
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (ref.current) {
                ref.current.value = "0adff0c0-e2d3-49e5-9e66-385ef2a82252";
              }
            }}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-md inset-ring inset-ring-gray-300 hover:bg-gray-50"
          >
            JPK
            <span className="text-gray-500 ml-2">
              [0adff0c0-e2d3-49e5-9e66-385ef2a82252]
            </span>
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <input
            name="id"
            type="text"
            ref={ref}
            placeholder="ID"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border shadow placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
        {id && <Results id={id} />}
      </form>
    </>
  );
}

const Results = ({ id }: { id: string }) => {
  const commentsQuery = useSuspenseQuery(commentsQueryOptions(id));

  if (commentsQuery.isError) {
    return <div>Error: {commentsQuery.error.message}</div>;
  }

  if (commentsQuery.isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2 h-[calc(100vh-240px)] overflow-auto px-2 pb-3">
      {commentsQuery.data?.map(
        (comment: {
          id: string;
          Name: string;
          Comment: string;
          timestamp: { date: string };
        }) => (
          <div
            key={comment.id}
            className="bg-white p-3 shadow border rounded-lg text-black"
          >
            <h2 className="flex justify-between text-sm font-semibold text-gray-700">
              <span>{comment.Name}</span>
              <span>
                {new Intl.DateTimeFormat("de-DE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(comment.timestamp.date))}
              </span>
            </h2>
            <p className="text-sm mt-2">{comment.Comment}</p>
          </div>
        )
      )}
    </div>
  );
};
