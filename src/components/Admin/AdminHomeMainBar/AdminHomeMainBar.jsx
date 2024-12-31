import React, { useState } from "react";
import { Tabs, Card } from "flowbite-react";

import SortingGroupBar from "../../SortingGroupBar/SortingGroupBar";
import QuestionChart from "./QuestionChart";
import AnswerChart from "./AnswerChart";
import UserChart from "./UserChart";

const sortingOptions = ["Hôm nay", "1 Tháng", "1 Năm"];

const AdminHomeMainBar = () => {
  const [questionChartType, setQuestionChartType] = useState("Hôm nay");
  const [answerChartType, setAnswerChartType] = useState("Hôm nay");
  const [userChartType, setUserChartType] = useState("Hôm nay");

  return (
    <div className="mx-auto min-h-screen p-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Tabs
          className="w-full"
          aria-label="Tabs with underline"
          variant="underline"
        >
          <Tabs.Item active title="Câu hỏi">
            <div className="flex flex-col gap-4">
              <Card>
                <div className="flex justify-center">
                  <SortingGroupBar
                    sortingOptions={sortingOptions}
                    active={questionChartType}
                    onChange={setQuestionChartType}
                  />
                </div>
                <div className="flex justify-center">
                  <span className="font-medium text-gray-800 dark:text-white">
                    Số lượng câu hỏi được đăng trong{" "}
                    {questionChartType.toLowerCase()}
                  </span>
                </div>
              </Card>

              <Card className="h-96">
                <QuestionChart type={questionChartType}></QuestionChart>
              </Card>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Câu trả lời">
            <div className="flex flex-col gap-4">
              <Card>
                <div className="flex justify-center">
                  <SortingGroupBar
                    sortingOptions={sortingOptions}
                    active={answerChartType}
                    onChange={setAnswerChartType}
                  />
                </div>
                <div className="flex justify-center">
                  <span className="font-medium text-gray-800 dark:text-white">
                    Số lượng câu trả lời được đăng trong{" "}
                    {answerChartType.toLowerCase()}
                  </span>
                </div>
              </Card>

              <Card className="h-96">
                <AnswerChart type={answerChartType}></AnswerChart>
              </Card>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Người dùng">
            <div className="flex flex-col gap-4">
              <Card>
                <div className="flex justify-center">
                  <SortingGroupBar
                    sortingOptions={sortingOptions}
                    active={userChartType}
                    onChange={setUserChartType}
                  />
                </div>
                <div className="flex justify-center">
                  <span className="font-medium text-gray-800 dark:text-white">
                    Số lượng tài khoản người dùng được tạo trong{" "}
                    {userChartType.toLowerCase()}
                  </span>
                </div>
              </Card>

              <Card className="h-96">
                <UserChart type={userChartType}></UserChart>
              </Card>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminHomeMainBar;
