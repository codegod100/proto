export default function () {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetch("/lookup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // session: session.value,
            handle: localStorage["handle"],
            message: message.value,
          }),
        });
        document.getElementById("message")!.value = "";
      }}
    >
      <input
        id="message"
        onChange={(e) => {
          message.value = e.target!.value;
        }}
        autofocus={true}
        autocomplete="off"
        name="message"
        class="input mt-1"
        type="text"
        placeholder="enter message..."
      />
    </form>
  );
}
