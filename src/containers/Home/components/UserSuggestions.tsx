import Image from "next/image";

const sampleData = [
  {
    avatar: "/profile.jpg",
    fullname: "internet00137",
    sub: "Suggested for you",
  },
  {
    avatar: "/profile.jpg",
    fullname: "internet00137",
    sub: "Suggested for you",
  },
  {
    avatar: "/profile.jpg",
    fullname: "internet00137",
    sub: "Suggested for you",
  },
  {
    avatar: "/profile.jpg",
    fullname: "internet00137",
    sub: "Suggested for you",
  },
];

function UserSuggestions() {
  return (
    <div className="mt-6 hidden max-w-[320px] flex-grow lg:block">
      <div className="mt-5">
        {sampleData.map((data, index) => {
          return (
            <div className="flex items-center justify-between mb-4" key={index}>
              <div className="flex items-center gap-2">
                <Image
                  className="h-[44px] w-[44px] cursor-pointer select-none rounded-full object-cover border-color-[rgb(0 0 0 / 40%)] border-[1px]"
                  src={data.avatar}
                  alt="avatar"
                  width="44"
                  height="44"
                />
                <div>
                  <p className="text-sm font-semibold">
                    {data.fullname}
                  </p>
                  <p className="text-xs text-[#737373]">
                    {data.sub}
                  </p>
                </div>
              </div>
              <p className="cursor-pointer text-xs font-semibold text-[#0095f6]">
                Follow
              </p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default UserSuggestions;
