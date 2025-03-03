import { AI } from "./AI";
import { readFileSync } from "fs";
import * as child_process from "node:child_process";

const indexes = [
  "2.2.2",
  // "2.2.3",
  // "2.2.4",
  // "2.2.4",
  // "2.2.4",
  // "2.2.4",
  // "2.2.4",
  // "2.2.4",
  // "2.2.4",
  // "2.2.4",
];

for (let i = 0; i < 1; i++) {
  const [part, chapter, section] = indexes[i].split(".");
  const aitc = new AI({
    systemInstructionPaths: ["src/instructions/TC.md"],
  });
  const aith = new AI({
    systemInstructionPaths: ["src/instructions/TH.md"],
  });

  const restc = await aitc.fetch([
    String(readFileSync("src/INDEXES.md")),
    `Soạn kịch bản tiếp cận hợp lý nhất (khách hàng rất hoài nghi về giải pháp nên sẽ nghi ngờ và không quan tâm) cho mục ${indexes[i]}, tuyệt đối không đặt ra những cách tiếp cận có khả năng trùng lắp với các mục x.x.x khác. Lưu ý là vì khách hàng còn đang nghi ngờ nên sẽ không thường mở rộng mindset lắm. Cung cấp cho sale 2 phần: tu duy kịch bản 5W1H và kịch bản hoàn chỉnh`,
  ]);
  console.log(restc);

  await Bun.write(
    `tai-lieu/${part}/${part}-${chapter}/${part}-${chapter}-${section}/${part}-${chapter}-${section}-tc.md`,
    restc || "",
  );

  // const resth = await aith.fetch([
  //   String(readFileSync("src/INDEXES.md")),
  //   `Soạn các tình huống phổ biến nhất mà khách hàng sẽ hỏi (khách hàng rất hoài nghi về giải pháp nên sẽ hỏi một cách nghi ngờ và thách thức) cho mục ${indexes[i]} (tối thiểu 3, tối đa 10), tuyệt đối không đặt ra những tình huống có khả năng trùng lắp với các mục x.x khác. Lưu ý là vì khách hàng còn đang nghi ngờ nên sẽ không thường show vấn đề của họ (có nhưng ít) mà thường tập trung nghi ngờ vào giải pháp của chúng ta. Cung cấp tư duy cho sale và cách trả lời (Cấu trả lời thuyết phục và dễ hiểu, gần giống essay nhưng ở dạng văn nói, chia đoạn nếu cần thiết) cho mỗi tình huống.`,
  // ]);
  // console.log(resth);
}
