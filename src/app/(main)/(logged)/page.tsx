"use client";

const UserPage = () => {
  return (
    <div
      className={cn(
        "flex space-x-4 w-full h-3/4 rounded-xl",
        poppins.className,
      )}
    >
      <article className="w-1/4 h-9/10 bg-white rounded-xl mx-auto">
        <div className="flex flex-wrap w-full h-1/3 gap-2 items-center justify-center mx-auto p-3">
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
          <div className="w-[46%] h-2/5 bg-neutral-100 rounded-xl" />
        </div>
        <Lists onClick={(index) => handleClick(index)} />
        {/* <button onClick={btnClickHandler}>알림 보내기</button> */}
      </article>
      <article className="w-2/4 h-9/10 bg-white rounded-xl p-9 pl-8">
        <FcAcceptDatabase size="50px" />
        <h1 className="text-xl">{pageTitles[pageIndex].title}</h1>
        {pageTitles[pageIndex].content.map((item, index) => (
          <div key={index}>
            <div className="flex justify-start space-x-2 mb-5 mt-5">
              <Checkbox
                id={`${id}-${index}`}
                checked={
                  checkedItems[pageIndex] && checkedItems[pageIndex][index]
                }
                onClick={() => playSound(index)}
                className="mr-3"
              />
              <Label id={`${id}-${index}`}>{item}</Label>
            </div>
            <hr className="w-full h-1 mt-4" />
          </div>
        ))}
      </article>
      <article className="w-1/4 h-9/10 bg-white rounded-xl p-3 relative">
        <Image
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          src={`/images/main-${pageIndex}.jpeg`}
          alt="image"
          priority
          fill
          sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"
        />
      </article>
    </div>
  );
};

export default UserPage;
