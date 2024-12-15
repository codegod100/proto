export default async function(req, ctx){
  const { did, rkey } = ctx.params
  console.log(did, rkey)
  const uri = `at://${did}/nandi.schemas.post/${rkey}`
  console.log({uri})
  const record = await ctx.state.pb.collection('posts').getFirstListItem(`uri="${uri}"`)
  console.log({record})
  return <div>
    <div>Title: {record.title}</div>
    <div>@{record.handle}</div>
    <div>Content: {record.content}</div>
<div class="mt-5">Add comment</div>
<div><textarea class="shadow input border" type="text" name="comment" /></div>
<div><button>Submit</button></div>
  </div>
}
