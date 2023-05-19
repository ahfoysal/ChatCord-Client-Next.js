import GetTimeAgo from "@/helper/time";
import Image from "next/image";
import Link from "next/link";

function ChatList({ chat, userId }) {
  const otherMember = chat?.members?.filter(
    (member) => member.id._id !== userId
  )[0];

  const otherMemberName = otherMember?.id?.name;
  const otherMemberPhotoUrl = otherMember?.id?.photoUrl;
  const otherMemberIsActive = otherMember?.id?.isActive;

  return (

        <Link href={`/chat/${chat._id}`} className="flex  items-center p-3 hover:bg-gray-800 rounded-lg relative">
          <div className="w-16 h-16 relative flex flex-shrink-0 ">
            <Image
            width={50}
            height={50}
              className="shadow-md rounded-full w-full h-full object-cover"
              src={otherMemberPhotoUrl}
              alt="User2"
            />
          {otherMemberIsActive &&   <div className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0">
                                <div class="bg-green-500 rounded-full w-3 h-3"></div>
                            </div>}
          </div>
          <div className=" flex-auto min-w-0 ml-3 mr-6  md:block group-hover:block">
          {  <p>{otherMemberName}</p>}
            <div className="flex  justify-between  items-center text-sm text-gray-600 gap-1">
              <div className="min-w-0">
                <p className="truncate">{chat?.lastMessage?.text}.</p>
              </div>
              <p className="ml-2 whitespace-no-wrap">{GetTimeAgo(chat?.lastMessage?.createdAt)}</p>
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
