import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import axios from "redaxios";

const fetchComments = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    console.info("Fetching comments...");
    return axios
      .get(`https://playout.3qsdn.com/comments/${data}/comments.json`)
      .then((r) => r.data);
  });

export const commentsQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["comments", id],
    queryFn: () => fetchComments({ data: id }),
  });
