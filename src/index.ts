import { AI } from "./AI";

console.log("Happy developing ✨");
console.log(process.env.GOOGLE_API_KEY);

const ai = new AI({
  systemInstructionPaths: ["src/instructions/TC.md", "README.md"],
});
await ai.fetch([
  "Soạn các tình huống phổ biến nhất mà khách hàng sẽ hỏi (khách hàng rất hoài nghi về giải pháp nên sẽ hỏi một cách nghi ngờ và thách thức) cho mục 2.2.1 (tối thiểu 3, tối đa 10), tuyệt đối không đặt ra những tình huống có khả năng trùng lắp với các mục x.x khác. Lưu ý là vì khách hàng còn đang nghi ngờ nên sẽ không thường show vấn đề của họ (có nhưng ít) mà thường tập trung nghi ngờ vào giải pháp của chúng ta. Cung cấp tư duy cho sale và cách trả lời (Cấu trả lời thuyết phục và dễ hiểu, gần giống essay nhưng ở dạng văn nói, chia đoạn nếu cần thiết) cho mỗi tình huống.",
]);
