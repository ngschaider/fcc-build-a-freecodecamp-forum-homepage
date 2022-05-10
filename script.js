const url = "https://forum-proxy.freecodecamp.rocks/latest";

const createCard = data => {
  const postersList = data.posters.map(d => {
    const avatarUrl = d.avatar_template.replace("{size}", "135");
    
    const urlPrefix = avatarUrl.startsWith("http") ? "" : "https://freecodecamp.org/forum";
    
    
    return "<a href='https://freecodecamp.org/forum/u/" + d.username + "'>\
      <img src='" + urlPrefix + avatarUrl + "' class='avatar'>\
    </a>";
  });
  
  const url = "https://forum.freecodecamp.org/t/" + data.slug + "/" + data.id;
  
  const html = '\
   <div class="card">\
      <div class="content">\
        <div class="header">\
          <a href="' + url + '">\
            ' + data.title + '\
          </a>\
        </div>\
        <div class="meta">\
          ' + postersList.join("") + '\
        </div>\
        <div class="description">\
          Last active: ' + moment(data.lastActive).fromNow() + '<br>\
          Views: ' + data.views + '<br> Posts: ' + data.postsCount + '\
        </div>\
      </div>\
    </div>';
  
  $("#output").append(html);
}

$.getJSON(url, data => {
  data.topic_list.topics.forEach(topicData => {
    const posters = topicData.posters.map(posterData => {
      return data.users.find(userData => userData.id === posterData.user_id);
    });
    
    createCard({
      id: topicData.id,
      slug: topicData.slug,
      title: topicData.title,
      posters: posters,
      views: topicData.views,
      postsCount: topicData.posts_count,
      lastActive: topicData.bumped_at,
    });
  });
});
