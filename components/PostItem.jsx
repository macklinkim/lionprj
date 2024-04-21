import { useRouter } from 'next/navigation';
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
PostItem.propTypes = {
  post: PropTypes.object.isRequired
};
function PostItem({post}) {
  const router = useRouter();
  const date = moment(post.updatedAt).format('yyyy-MM-DD HH:mm:ss');
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-600 dark:hover:bg-gray-200 transition duration-150 ease-in-out">
      <td className="p-2 text-center">{ post._id }</td>
      <td className="p-2 truncate indent-4 cursor-pointer" onClick={ () => { router.push(`/post/${post._id}`) } }>{ post.title }</td>
      <td className="p-2 truncate">{ post.user.name }</td>
      <td className="p-2 text-center hidden sm:table-cell">{ post.views }</td>
      <td className="p-2 text-center hidden sm:table-cell">{ post.replies.length || 0 }</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">{ date }</td>
    </tr>
  )
}

export default PostItem