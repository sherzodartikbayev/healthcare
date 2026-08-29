import {useMutation} from "@tanstack/react-query";
import {loginRequest} from "../api/auth.api.ts";

export const useLogin = () => {
   return useMutation({
     mutationFn: loginRequest,
   })
};
