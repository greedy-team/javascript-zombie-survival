/**
 * 
 * @returns 1부터 20까지의 랜덤한 정수 반환
*/
export default function RandomNumber() { 
    return Math.floor(Math.random() * 20) + 1;
}