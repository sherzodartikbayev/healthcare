import { Loader2} from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary text-blue" />
        </div>

        <div className="text-center">
          <p className="text-base font-medium text-foreground">
            Yuklanmoqda
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Iltimos, biroz kuting...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
