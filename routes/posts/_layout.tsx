export default async function (req, ctx) {
  const path = ctx.url.pathname;
  const postPath = path !== "/posts/new";
  const indexPath = path !== "/posts";
  return (
    <div>
      <ctx.Component />
      {postPath &&
        (
          <div class="mt-5">
            <a href="/posts/new">Create a new post</a>
          </div>
        )}
      {indexPath && (
        <div class="mt-2">
          <a href="/posts">View all posts</a>
        </div>
      )}
    </div>
  );
}
