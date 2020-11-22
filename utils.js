// Text 길이기 길 경우 limit 을 걸어 이후 문자는 자른다.
export const trimText = (text = "", limit) => (text.length > limit ? `${text.slice(0, limit)}...` : text);

// api 날짜를 멋지게 변경시켜주는 JavaScirpt 매직 함수
export const formatDate = date => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("ko-kr", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });
};