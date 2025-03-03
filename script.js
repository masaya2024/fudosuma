// 初期状態で「送信中」フラグを非表示にする
document.getElementById("sendLodingFlag").style.visibility = "hidden";
const href = window.location.href;

window.onload = () => {
  if (href.includes("contact")) {
    document.getElementById("contact_send").addEventListener("click", () => {
      sendPost();
      return false;
    });
  } else {
    document.getElementById("send").addEventListener("click", () => {
      sendPost();
      return false;
    });
  }
};

const getParam = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const sendPost = async () => {
  try {
    const param = getParam("AD_CODE");

    let media = "";
    if (param === "フドスマ") {
      media = "フドスマ";
    } else if (param !== null && param !== "") {
      media = param;
    }

    // 送信中フラグを表示
    document.getElementById("sendLodingFlag").style.visibility = "visible";

    // ページの種類に応じた入力要素の取得
    const last_name = href.includes("contact")
      ? document.getElementById("contact_last_name").value
      : document.getElementById("last_name").value;
    const first_name = href.includes("contact")
      ? document.getElementById("contact_first_name").value
      : document.getElementById("first_name").value;
    const email = href.includes("contact")
      ? document.getElementById("contact_email").value
      : document.getElementById("email").value;

    if (last_name === "" || first_name === "" || email === "") {
      alert("お名前またはメールアドレスを入力してください");
      document.getElementById("sendLodingFlag").style.visibility = "hidden";
      return;
    }

    // 送信するフィールド情報
    let fields = {
      last_name: last_name,
      first_name: first_name,
      email: email,
      medium: media,
    };

    // iframeが存在しなければ作成（hiddenに設定）
    let customHiddenIframeName = "JLA_API";
    if (!document.getElementById(customHiddenIframeName)) {
      let theiFrame = document.createElement("iframe");
      theiFrame.id = customHiddenIframeName;
      theiFrame.name = customHiddenIframeName;
      theiFrame.src = "about:blank";
      theiFrame.style.display = "none";
      document.body.appendChild(theiFrame);
    }

    // POST送信用のフォームを動的に作成
    let form = document.createElement("form");
    form.method = "POST";
    form.action = "http://info.uk-corp.co.jp/l/957632/2025-02-26/75zgl"; // ※実際の送信先URLに置き換えてください
    form.setAttribute("target", customHiddenIframeName);
    for (let fieldName in fields) {
      let theInput = document.createElement("input");
      theInput.name = fieldName;
      theInput.value = fields[fieldName];
      theInput.setAttribute("type", "hidden");
      form.appendChild(theInput);
    }
    document.body.appendChild(form);

    // フォーム送信
    await form.submit();

    // 送信後、1秒後にthanks.htmlへリダイレクト（contactページの場合はひとつ上の階層に移動）
    setTimeout(() => {
      window.location.href = href.includes("contact")
        ? "../thanks.html"
        : "thanks.html";
    }, 1000);

    // 送信中フラグを非表示にする
    document.getElementById("sendLodingFlag").style.visibility = "hidden";
  } catch (e) {
    console.log(e);
  }
};

const formFocus = () => {
  href.includes("contact")
    ? document.getElementById("contact_last_name").focus()
    : document.getElementById("last_name").focus();
};
