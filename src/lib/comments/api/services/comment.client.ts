import { AxiosResponse } from "axios";
import { frontendHttp } from "@config/axios/frontend-http.config";
import { proxyEnvironment } from "@config/proxy-api.config";
import { Comment, CommentFilters } from "../types";
import { Page, Result } from "@/lib/_/errors/response.model";
import { ApiError } from "@/lib/_/errors/api-error";

const {
  api: {
    rest: {
      endpoints: { comments: commentsUrl },
    },
  },
} = proxyEnvironment;

export async function fetchComments(
  filters?: CommentFilters,
): Promise<Result<Page<Comment[]>, ApiError>> {
  const res = await frontendHttp().get<
    unknown,
    AxiosResponse<Result<Page<Comment[]>, ApiError>>
  >(commentsUrl, { params: filters });
  return res.data;
}

export async function fetchCommentById(
  id: number,
): Promise<Result<Comment, ApiError>> {
  const res = await frontendHttp().get<
    unknown,
    AxiosResponse<Result<Comment, ApiError>>
  >(`${commentsUrl}/${id}`);
  return res.data;
}
