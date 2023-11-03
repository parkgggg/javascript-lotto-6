import Lotto from "./Lotto.js";
import { MissionUtils } from "@woowacourse/mission-utils";

class App {

  validateMoney (money){
    if (money === "") throw new Error("[ERROR] 입력값이 없습니다.");
    if (money.includes(' ')) throw new Error("[ERROR] 공백을 제외하고 입력해주세요.");
    if (isNaN(money)) throw new Error("[ERROR] 숫자만 입력해주세요.");
    if (parseInt(money) % 1000 !== 0) throw new Error ("[ERROR] 천 원 단위로 입력해주세요.");
    return (parseInt(money) / 1000);
  }

  async inputMoney() {
    try{
      const money = await MissionUtils.Console.readLineAsync('구입 금액을 입력하세요.\n');
      const affordable = this.validateMoney(money);
      return affordable;
    } catch(error){
      MissionUtils.Console.print(error.message);
    }
  }
  
  async play() {
    //const tickets = await this.inputMoney();
    //MissionUtils.Console.print(tickets);
  }
}

export default App;
