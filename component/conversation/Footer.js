import React from "react"
import axios from "axios"

import { IoSend, IoHeart } from "react-icons/io5"
import { AiFillLike, AiFillPicture, AiFillSmile } from "react-icons/ai"

const ConversationFooter = ({
  isemojiShown,
  setIsemojiShown,
  sendMessage,
  setMessageText,
  setHasTextInput,
  messageText,
  chatFetch,
}) => {
  const cloudinary = {
    cloud_name: "diwcbidtu",
    api_key: "829485526543539",
    api_secret: "n_ESYvxomHsrPMVR8AR4IIAG4yE",
  }

  const handleImagePicker = async (e) => {
    const file = e.target.files[0]

    if (file.type.match("image.*")) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "my_chat_images")

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinary.cloud_name}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        console.log(response.data.secure_url)
        const imageUrl = response.data.secure_url
        sendMessage(imageUrl, "image")
        // update conversation with the image URL
        // This line needs to be modified or removed. Please update it according to your code.
      } catch (error) {
        console.error(error)
      }
    }
  }

  const emojiSize = 25

  

  return (
    <div className=" chat-footer sm:relative flex-none z-10 bg-slate-900">
      <div className="flex flex-row items-center justify-between py-2 px-1">
        {/* gallery icon */}
        <label
          htmlFor="image-upload"
          className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
        >
          {/* replace with react-icon */}
          <AiFillPicture size={emojiSize} />
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImagePicker}
          style={{ display: "none" }}
        />

        <div className="relative flex-grow">
          <label>
            <input
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value)
                setHasTextInput(e.target.value.length > 0)
              }}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="Type your message..."
              className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
            />
            <button
              onClick={() => setIsemojiShown(isemojiShown ? false : true)}
              type="button"
              className="absolute hidden md:flex  top-0 right-0 mt-2 mr-3  flex-shrink-0 focus:outline-none text-blue-600 hover:text-blue-700 w-6 h-6"
            >
              {/* emoji icon */}
              <AiFillSmile size={emojiSize} />
            </button>
          </label>
        </div>
        {/* show send button when there is input, otherwise show like button */}
        {messageText.length > 0 ? (
          <button
            type="button"
            onClick={() => sendMessage(messageText, "text")}
            className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
          >
            {/* send icon */}
            <IoSend size={emojiSize} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => sendMessage(messageText, "like")}
            className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
          >
            {/* like icon */}
            <IoHeart size={emojiSize} />
          </button>
        )}
      </div>
    </div>
  )
}

export default ConversationFooter
