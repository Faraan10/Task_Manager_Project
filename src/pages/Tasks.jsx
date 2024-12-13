import { useState, useEffect } from "react";
import axios from "axios";
import "./tasks.css";

const Tasks = () => {
  const [apiData, setApiData] = useState();

  const getData = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => setApiData(response.data.slice(0, 20)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(apiData);

  return (
    <>
      <div className="container">
        <h2>The Tasks are Listed Below</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  TASK iD
                </th>
                <th scope="col" className="px-6 py-3">
                  TITLE
                </th>
                <th scope="col" className="px-6 py-3">
                  DESCRIPTION
                </th>
                <th scope="col" className="px-6 py-3">
                  STATUS
                </th>
                <th scope="col" className="px-6 py-3">
                  {/* <span className="sr-only">Edit</span> */}
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                // key={task.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  tit
                </th>
                <td className="px-6 py-4">des</td>

                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tasks;
