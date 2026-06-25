import { useSnackbarStore } from "@/shared/components/snackbar/snackbarStore";
import { Snackbar } from "@hh.ru/magritte-ui";

export const SnackbarRenderer = () => {
  const snackbars = useSnackbarStore((state) => state.snackbars);
  const closeSnackbar = useSnackbarStore((state) => state.closeSnackbar);

  return (
    <>
      {snackbars.map((snackbar) => (
        <Snackbar
          key={snackbar.id}
          align="bottom"
          autohideTime={3000}
          showClose
          showTimer
          onClose={() => closeSnackbar(snackbar.id)}
        >
          {snackbar.message}
        </Snackbar>
      ))}
    </>
  );
};
