import React from "react";
import { FaCommentAlt, FaStackOverflow } from "react-icons/fa";

const HomeRightSideContent = () => {
  return (
    <div>
      <div className="w-full h-fit flex flex-col space-y-10 mt-6">
        <div className="flex flex-col items-start">
          {/* 1st box featured on meta */}
          <div className="flex flex-col w-full border-[1px] border-yellow-400 rounded">
            <div className="flex flex-col items-start w-full">
              <div className="bg-[#FAECC6] w-full px-4 py-2 text-sm font-bold">
                Featured on Meta
              </div>
              <div className="flex flex-col w-full p-4 bg-[#fcf3e1] space-y-3 border-y-[1px] border-yellow-400">
                <div className="flex items-center space-x-2 w-full">
                  <FaCommentAlt />
                  <p className="text-sm">Update: New Colors Launched</p>
                </div>
                <div className="w-full flex justify-normal space-x-2">
                  <FaCommentAlt className="w-5 mt-1" />
                  <p className="text-sm">
                    We're rolling back the changes to the Acceptable Use Policy
                    (AUP)
                  </p>
                </div>
                <div className="flex space-x-2 w-full">
                  <FaStackOverflow className=" mt-[.125rem]" />
                  <p className="text-sm">
                    Temporary policy: Generative AI (e.g., ChatGPT) is banned
                  </p>
                </div>
                <div className="flex space-x-2 w-full">
                  <FaStackOverflow className=" mt-[.125rem]" />
                  <p className="text-sm">
                    Beta test for short survey in banner ad slots starting on
                    the week of...
                  </p>
                </div>
                <div className="flex space-x-2 w-full">
                  <FaStackOverflow className=" mt-[.125rem]" />
                  <p className="text-sm">
                    Collectives updates: new features and ways to get started
                    with Discussions
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col items-start w-full">
              <div className="bg-[#FAECC6] w-full px-4 py-2 text-sm border-b-[1px] rounded-b-none rounded border-yellow-400 font-bold">
                Hot Meta Posts
              </div>
              <div className="flex flex-col w-full p-4 bg-[#fcf3e1] space-y-3">
                <div className="flex text-sm items-center space-x-2 w-full">
                  <span className="text-gray-600">16</span>
                  <p>Disambiguate the [jetstream] tag</p>
                </div>
                <div className="w-full text-sm flex justify-normal space-x-2">
                  <span className="text-gray-600">7</span>
                  <p>
                    Am I liable for re-sharing image links provided via the
                    Stack Exchange API?
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default HomeRightSideContent;
