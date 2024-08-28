import React from "react";

function CommunicationWidget() {
  return (
    <div className="flex flex-col col-span-full row-span-2 sm:col-span-6 xl:col-span-3 bg-gradient-to-r from-green-400 to-blue-600 dark:bg-black shadow-sm rounded-xl  bg-no-repeat bg-bottom">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-white dark:text-white">
          İletişim Bilgilerim
        </h2>
      </header>

      <div className="flex flex-col grow justify-start gap-2">
        <div className="flex justify-between items-center px-5 py-2">
          <h1 className="font-semibold text-xl line-clamp-1 text-white dark:text-white mr-2">
            Email:
          </h1>
          <h1 className="text-base line-clamp-1 text-white dark:text-white">
            furkan97demirbozan@gmail.com
          </h1>
        </div>

        <div className="flex justify-between items-center px-5 py-2">
          <h1 className="font-semibold text-xl line-clamp-1 text-white dark:text-white mr-2">
            Telefon:
          </h1>
          <h1 className="text-base line-clamp-1 text-white dark:text-white">
            (555) 555 55 55
          </h1>
        </div>

        <div className="flex justify-between items-center px-5 py-2">
          <h1 className="font-semibold text-xl text-white dark:text-white mr-2">
            Adres:
          </h1>
          <h1 className="text-base text-right text-white dark:text-white line-clamp-3">
            Mebusevleri, Akdeniz Cd. No:31, 06570 Çankaya/Ankara
          </h1>
        </div>
      </div>
    </div>
  );
}

export default CommunicationWidget;
