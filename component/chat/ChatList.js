import GetTimeAgo from "@/helper/time";
import Image from "next/image";
import Link from "next/link";

function ChatList({ chat, userId }) {
  const otherMember = chat?.members?.filter(
    (member) => member?._id !== userId
  )[0];

  const otherMemberName = otherMember?.name;
  const otherMemberPhotoUrl = otherMember?.photoUrl;
  const otherMemberIsActive = otherMember?.isActive;
  console.log(otherMemberName, otherMemberPhotoUrl, otherMemberIsActive)

  return (
    <Link
      href={`/chat/${chat._id}`}
      className="flex  items-center p-2 hover:bg-gray-800 rounded-lg relative"
    >
      <div className="w-14 h-14 relative flex flex-shrink-0 ">
        <Image
          width={500}
          height={500}
          className="shadow-md rounded-full w-full h-full object-cover"
          src={otherMemberPhotoUrl}
          alt="User2"
        />
        {otherMemberIsActive && (
          <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
            <div class="bg-green-500 rounded-full w-3 h-3"></div>
          </div>
        )}
      </div>
      <div className=" flex-auto min-w-0 ml-3 sm:hidden   md:block ">
        {<p>{otherMemberName}</p>}
        <div className="flex w-full justify-between flex-row items-center text-sm text-gray-600">
          <p className="w-36  truncate md:w-full overflow-hidden">
            {userId === chat?.lastMessage?.senderId && "You: "}
            {chat?.lastMessage?.messageType === "image"
              ? "sent a photo"
              : chat?.lastMessage?.text}
            .
          </p>
          <p >
            {GetTimeAgo(chat?.lastMessage?.createdAt)}
          </p>
        </div>
      </div>
      {/* is seeen  */}
      {/* <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
            <img
              className="rounded-full w-full h-full object-cover"
              alt="user2"
              src="https://randomuser.me/api/portraits/men/45.jpg"
            />
          </div> */}
    </Link>
  );
}

export default ChatList;
