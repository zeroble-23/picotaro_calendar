jQuery(function(){
  const YEAR          = 2016;
  const MONTH         = 12;
  const DISABLED_DAYS = [25, 26, 27, 28, 29, 30, 31];
  const UPLOAD_URL    = "aaa.html";

  var dayOfMonth;

  $(document).ready(function(){
    var imgArray =  [ "resources/img/622554118.jpg",
                      "resources/img/Piko-Taro-copy.jpg"
                    ];

    var monthDays              = getDaysInMonth(YEAR, MONTH);
    var firstDay          = getFirstDayOfMonth(YEAR,MONTH);
    var lastDay           = getLastDayOfMonth(YEAR,MONTH);
    var previousMonthDays = getDaysOfLastMonth(YEAR, MONTH-1) - firstDay + 1;
    var cellContent       = [];

    //カレンダーに写真を表示するか、ボタンを表示するかをarrayに設定する
    for(var idays=0; idays < monthDays; idays++){
      //写真のindexに写真のパスがあれば、cellContentに<img>をプッシュ
      if(imgArray[idays] != null){
        cellContent.push(
                          '<a href="#" onclick="return false;">' +
                            '<img class="member-img" id="memberImg" src="' + imgArray[idays] + '"/>' +
                          '</a>'
        );
      }
      //何もなければ、ボタンをcellContentにプッシュ
      else{
        cellContent.push(
                            '<button type="button" name="button" class="button button-action register-cosplay-button" value=' + (idays+1)+'>' +
                              'Upload' +
                            '</button>'
        );
      }
    }
    //カレンダーの生成
    var day = 1;
    var nextMonthDays = 1;
    var appendRow;

      for(var iweeks = 0; iweeks < 5; iweeks++){
        appendRow = '<tr>';

        for(var idays = 0; idays < 7; idays++){
          if(iweeks === 0 && idays < firstDay){
            appendRow += '<td class="calendar-day-disabled"><p class="calendar-date">' + previousMonthDays + '</p></td>';
            previousMonthDays++;
          }
          else{
            if(day > monthDays){
              appendRow += '<td class="calendar-day-disabled"><p class="calendar-date">' + nextMonthDays + '</p></td>';
              nextMonthDays++;
            }
            else{
                appendRow +=  '<td class="calendar-day" bgcolor="#fbfbfb  " id="cal' + day + '"><p class="calendar-date">' + day +'</p>' +
                              '<div class="calendar-content">' + cellContent[day-1] +
                              '</td>';
                day++;
            }
          }
        }

        appendRow += '</tr>'
        $('tbody').append(appendRow);
      }

      //無効日があれば、htmlを削除
      if(DISABLED_DAYS.length > 0){
        for(var z=0; z < DISABLED_DAYS.length; z++){
          $('#cal'+DISABLED_DAYS[z]).attr('class','calendar-day-disabled');
          $('#cal'+DISABLED_DAYS[z]).html('<p class="calendar-date">'+DISABLED_DAYS[z]+'</p>');
        }
      }
  });

  //拡大画面でXボタンを押すと、黒いBGを削除
  $(document).on('click', '.register-cosplay-button', function(){
    dayOfMonth = $(this).val();
    $("#file_upload").trigger('click');
  });

  //写真をアップロード
  $("#file_upload").on('change', function(){
    $(".loader").css('display','inline');
    $("#day_of_month").val(dayOfMonth);

    $.ajax({
      type : "POST",
      url : UPLOAD_URL,
      dataType: 'jsonp',
      crossDomain : true,
      data : $("#piko-taro-form").serialize(),
      success : function () {
        $(".loader").css('display','none');
        alert('ok');
      },
      fail : function () {
        $(".loader").css('display','none');
        alert('fail');
      }
    });

  });

  //クリックされた画像のソースを読み込み、拡大する
  $(document).on('click', '.member-img', function(){
    var imgSrc = $(this).attr('src');
    $('.modal-content').attr('src', imgSrc);
    $('.modal').css('display','inline');
  });

  //拡大画面でXボタンを押すと、黒いBGを削除
  $(document).on('click', '.modal-close', function(){
    $('.modal').css('display','none');
  });

  //設定した月の日数を取得
  function getDaysInMonth(year, month){
    return new Date(year, month, 0).getDate();
  }
  //設定した月の最初日を取得
  function getFirstDayOfMonth(year, month){
    return new Date(year, month - 1, 1).getDay();
  }
  //設定した月の最終日を取得
  function getLastDayOfMonth(year, month){
    return new Date(year, month, 0).getDay();
  }
  //設定した月の先月の日数を取得
  function getDaysOfLastMonth(year, month){
    return new Date(year, month, 0).getDate();
  }

})
