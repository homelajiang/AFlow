{% extends "layout.tpl" %}
{% block content %}
{% if post %}
<div class="post">
    <h2 class="post-title">{{post.title}}</h2>
    <div class="post-meta">
      <span class="post-date">
        {{post.publish_date}}
      </span>
        <!--<span class="post-author">WrittenBy Elliot</span>-->
    </div>

    <!--Tags-->
    {% if post.tags.length>0 %}
    <span class="post-tags">
        {% for tag in post.tags %}
            #<a href="/tag/{{tag.name}}">{{tag.name}}</a>&nbsp;&nbsp;
        {% endfor %}
      </span>
    {% endif %}
    <!--Cover-->

    <!--    {% if post.cover %}
        <img src="{{post.cover}}" class="post-cover"/>
        {% endif %}-->
    <!--content-->
    <div class="post-content">
        <!-- todo  需要解决转义问题-->
        {% markdown %}
        {{post.content | safe}}

        {% endmarkdown %}
    </div>

    {% if showAround %}
    <!--pagination-->
    <div class="pagination">
        <div class="pagination__title">
            <span class="pagination__title-h">READ OTHER POSTS</span>
            <hr/>
        </div>
        <div class="pagination__buttons">
            {% if previous %}
            <a href="/post/{{previous.id}}">
                <span class="button__icon">←</span>
                <span class="button__text">{{previous.title}}</span>
            </a>
            {% endif %}

            {% if next %}
            <a href="/post/{{next.id}}">
                <span class="button__text">{{next.title}}</span>
                <span class="button__icon">→</span>
            </a>
            {% endif %}
        </div>
    </div>
    {% endif %}

    <div class="posts post on-list">

        <h3>评论（{{comments.count}}）</h3>

        {% for comment in comments.list %}
        <div style="padding: 20px;">
            <div style="display: flex;">
                <img style="width: 40px;height: 40px; border-radius:50%;"
                     src="{{comment.creator.img if comment.creator.img else '/public/img/default_avatar.png'}}">
                <div style="padding: 0 20px;">
                    <div>
                        <span style="vertical-align:middle;"><b>{{comment.creator.name}}</b></span>&nbsp;
                        <span style="opacity: .5;font-size: .8rem;">{{comment.create_date}}</span>
                    </div>

                    <div style="font-size: .9rem;margin-top: 5px;">
                        {{comment.content}}
                    </div>
                </div>
            </div>
        </div>

        {% else %}

        <div style="text-align: center;">暂无评论</div>

        {% endfor %}


        {% if post.open_comment %}
        <div style="margin-top: 60px;">
            <h3>发表评论</h3>
            <div>您的留言 （电子邮件地址不会被公开。）</div>

            <form action="{{'/post/'+post.id}}" method="post">
                <textarea placeholder="发表你的看法" rows="8" name="content"
                          style="padding: 10px;width: 100%;border-radius: 5px;font-size:1.1rem;margin-top: 10px;"></textarea>

                <div>
                    <div style="margin-top: 15px;margin-bottom: 5px;">
                        <label>您的称呼</label>
                    </div>
                    <input style="padding: 5px;border:1px solid #d3d3d3;border-radius: 2px;font-size: 1rem;"
                           name="name"
                           size="30"
                           placeholder="称呼（必填）">
                </div>

                <div>
                    <div style="margin-top: 15px;margin-bottom: 5px;">
                        <label>电子邮箱</label>
                    </div>
                    <input style="padding: 5px;border:1px solid #d3d3d3;border-radius: 2px;font-size: 1rem;"
                           size="30"
                           name="email"
                           placeholder="邮箱（必填）">
                </div>

                <div>
                    <div style="margin-top: 15px;margin-bottom: 5px;">
                        <label>个人网址</label>
                    </div>
                    <input style="padding: 5px;border:1px solid #d3d3d3;border-radius: 2px;font-size: 1rem;"
                           size="30"
                           name="host"
                           placeholder="主页（选填）">
                </div>

                <input style="border:1px solid #d3d3d3;width: 10em;padding: 4px 0;margin-top: 20px;" type="submit"
                       value="发表">

            </form>
        </div>
        {% else %}
        <div>**该文章禁止评论**</div>
        {% endif %}

    </div>

</div>

</div>
{% else %}

<h2 class="post-title">The Post Not Found.</h2>

{% endif %}
{% endblock %}
