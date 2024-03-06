//honeslty I don't know what the previous javascript was for. So erasing it and making something
//worked well.

//gets the notes so it can refresh the page
$(document).ready(function () {
  function fetchAndRenderNotes() {
    $.ajax({
      type: "GET",
      url: "/api/notes",
      success: function (notes) {
        renderNotes(notes);
      },
      error: function (error) {
        console.error("Error fetching notes:", error);
      }
    });
  }
  function renderNotes(notes) {
    var listGroup = $("#list-group");
    listGroup.empty();

    notes.forEach(function (note) {
        var listItem = $("<li class='list-group-item'></li>");
        var titleContainer = $("<div class='title-container'></div>");
        var titleEl = $("<h2 class='notes-title'>" + note.title + "</h2>");
        var delBtnEl = $("<i class='fas fa-trash-alt float-right text-danger delete-note'></i>");
        delBtnEl.addClass('larger-icon');
        titleContainer.append(titleEl);
        titleContainer.append(delBtnEl);
        listItem.append(titleContainer);
        listGroup.append(listItem);
    });
}
  fetchAndRenderNotes();

  $("#save-note").click(function () {
    var noteData = {
      title: $(".note-title").val(),
      text: $(".note-textarea").val()
    };
    $.ajax({
      type: "POST",
      url: "/api/notes",
      data: noteData,
      success: function (response) {
        console.log("Note saved successfully:", response);
        fetchAndRenderNotes();
        $("#note-form")[0].reset();
      },
      error: function (error) {
        console.error("Error saving note:", error);
      }
    });
  });
});
//Added this in as easy way to clear-form

  $(".new-note").click(function () {
    $("#save-note").show();
    $("#clear-form").show();
  });

  $("#clear-form").click(function () {
    $(".note-title").val('');
    $(".note-textarea").val('');
    $("#clear-form").hide();
    $("#save-note").hide();
    
  });

