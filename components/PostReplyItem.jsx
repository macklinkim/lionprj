'use client'
import React from 'react'
import PropTypes from 'prop-types';
PostReplyItem.propTypes = {
  reply: PropTypes.object.isRequired,
}
function PostReplyItem({ reply }) {
  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
    <div className="flex justify-between items-center mb-2">
      <a className="text-blue-500" href=""> { reply.user.name }</a>
      <time className="ml-auto text-gray-500" dateTime={ reply.createdAt }>{ reply.createdAt }</time>
    </div>
    <pre className="whitespace-pre-wrap text-sm">{ reply.content }</pre>
    
  </div>
  )
}

export default PostReplyItem