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

  validateEachNum (number) {
    if (isNaN(number)) throw new Error("[ERROR] 숫자만 입력해주세요");
    if (parseInt(number) > 45 || parseInt(number) < 1) throw new Error("[ERROR] 1~45 사이의 수를 선택해주세요.");
    return (parseInt(number));
  }

  validatePicks (numberPicks){
    const numberArray = numberPicks.split(",");
    if (numberPicks === "") throw new Error("[ERROR] 입력값이 없습니다.");
    if (numberPicks.includes(' ')) throw new Error("[ERROR] 공백을 제외하고 입력해주세요.");
    numberArray.forEach((value, index, array) => {
      try {
        const number = this.validateEachNum(value);
        if (array.includes(number)) throw new Error("[ERROR] 중복된 수는 불가합니다.");
        array[index] = number;
      } catch(e) {
        throw e;
      }
    })
    return numberArray;
  }

  async inputMoney() {
    try{
      const money = await MissionUtils.Console.readLineAsync('구입 금액을 입력하세요.\n');
      const affordable = this.validateMoney(money);
      return affordable;
    } catch(error){
      throw error;
    }
  }

  async inputPick() {
    try{
      const basicPick = await MissionUtils.Console.readLineAsync('당첨 번호를 입력해 주세요.\n');
      const bonusPick = await MissionUtils.Console.readLineAsync('보너스 번호를 입력해 주세요.\n');
      const picks = this.validatePicks(basicPick);
      if (picks.includes(this.validatePicks(bonusPick))) throw new Error("[Error] 중복된 번호는 불가능합니다.");
      picks.push(parseInt(this.validatePicks(bonusPick)));
      if (picks.length !== 7) throw new Error("[Error] 기본 픽 6 수와 보너스 1픽의 규칙을 지켜주세요.");
      return picks;
    } catch(error){
      throw error;
    }
  }
  
  buyLotto(affordable) {
    const tickets = [];
    let cnt = 0;
    while (cnt < affordable){
      const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      tickets[cnt] = numbers.sort(function(a, b) {
        return a-b;
      });
      cnt += 1;
    }
    return tickets;
  }

  printTickets(tickets, affordable) {
    MissionUtils.Console.print(`${affordable}개를 구매했습니다.`);
    tickets.forEach((value) => {
      MissionUtils.Console.print(value);
    });
  }

  async play() {
    try {
      const numOftickets = await this.inputMoney();
      const tickets = this.buyLotto(numOftickets);
      this.printTickets(tickets, numOftickets);
      const picks = await this.inputPick();
      MissionUtils.Console.print(picks);
    } catch(e){
      console.log(e.message);
    }
  }
}

const A = new App();
A.play();

export default App;
