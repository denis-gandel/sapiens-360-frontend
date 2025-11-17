import { Check } from "lucide-react";
import { useToast } from "reshaped";

export class Toaster {
  protected toast = useToast();

  success(message: string) {
    this.toast.show({
      text: message,
      icon: Check,
      color: "positive",
    });
  }

  warning(message: string) {
    this.toast.show({
      text: message,
      icon: Check,
      color: "warning",
    });
  }

  critical(message: string) {
    this.toast.show({
      text: message,
      icon: Check,
      color: "critical",
    });
  }

  primary(message: string) {
    this.toast.show({
      text: message,
      icon: Check,
      color: "primary",
    });
  }
}
