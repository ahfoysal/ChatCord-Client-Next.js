import axios from "axios";
import Image from "next/image";


function Discover({ user, router, userId }) {
  console.log(user._id, userId);

    const handleClick = async () => {
      // const response = await axios.post(
      //   `${process.env.BACKEND}api/v1/newfriend`,
      //   {
      //     senderId: userId,
      //     receiverId: user._id,
      //   }
      // );
      const { data } = await axios.post(
        `${process.env.BACKEND}api/v1/newConversation`,
        {
          Sender: userId,
          Receiver: user._id,
        }
      );
      console.log( data, data.conversations._id); 
      router.push(`/chat/${data.conversations._id}`);
    }

  return (
    <button onClick={handleClick}
      className="flex w-full  items-center py-3 px-2  hover:bg-gray-800 rounded-lg relative "
    >
      <div className="w-10 h-10 relative flex flex-shrink-0  ">
        <Image
          width={500}
          
          height={500}
          className="shadow-md rounded-full w-full h-full object-cover"
          src={user.photoUrl}
          alt="User2"
        />
        {user.isActive && (
          <div className="absolute bg-gray-900  rounded-full bottom-0 right-0">
            <div class="bg-green-500 rounded-full w-3 h-3"></div>
          </div>
        )}
      </div>
      <div className="  min-w-0 ml-3   sm:hidden   md:block ">
        {<p>{user.name}</p>}
        <div className="flex w-full justify-between flex-row items-center text-sm text-gray-600">
        
        </div>
      </div>
     
    </button>
  );
}

export default Discover;
