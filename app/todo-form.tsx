"use client";
import {onAddToDo} from "@/actions/todo";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {formSchema} from "@/lib/validators";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTransition} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import * as z from "zod";

type Props = {};

function TodoForm({}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });
  // const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {isLoading, isSubmitting, isValid} = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      onAddToDo(values)
        .then((data) => {
          if (data?.error) {
            toast.error("somethin went wrong!");
          }

          if (data?.success) {
            toast.success("todo added");
          }
        })
        .catch(() => toast.error("somethin went wrong"));
    });
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" mt-4 flex items-center justify-between w-full  "
        >
          <FormField
            control={form.control}
            name="todo"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="write a todo..."
                    disabled={isSubmitting || isLoading || isPending}
                    className="w-[400px] border-none ring-0 ring-offset-0 
                      focus-within:ring-0 focus-within:ring-offset-0 
                      focus-visible:ring-0 focus-visible:ring-offset-0 "
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className=""
            disabled={isLoading || isSubmitting || !isValid || isPending}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default TodoForm;
