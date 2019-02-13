{% extends "layout.tpl" %}
{% block content %}
{% if post %}
<div class="post">
    <h2 class="post-title">{{post.title}}</h2>
    <div class="post-meta">
      <span class="post-date">
        {{post.create_date}}
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

    {% if post.cover %}
    <img src="{{post.cover}}" class="post-cover"/>
    {% endif %}
    <!--content-->
    <div class="post-content">
        {{post.content}}
    </div>

    <!--pagination-->
    <div class="pagination">
        <div class="pagination__title">
            <span class="pagination__title-h">READ OTHER POSTS</span>
            <hr/>
        </div>
        <div class="pagination__buttons">

            <a href="#">
                <span class="button__icon">←</span>
                <span class="button__text">上一页</span>
            </a>

            <a href="#">
                <span class="button__text">下一页</span>
                <span class="button__icon">→</span>
            </a>

        </div>
    </div>

    <div class="posts post on-list">
        <h3>评论（36）</h3>

        {% for item in [1,2,3,4,5,6] %}
        <div style="padding: 20px;">
            <div style="display: flex;">
                <img style="width: 40px;height: 40px; border-radius:50%;"
                     src="https://i.loli.net/2018/12/14/5c1351e690df1.jpg">
                <div style="padding: 0 20px;">
                    <div>
                        <span style="vertical-align:middle;"><b>我推故我在</b></span>&nbsp;
                        <span style="opacity: .5;font-size: .8rem;">一个月前</span>
                    </div>

                    <div style="font-size: .9rem;margin-top: 5px;">
                        这个菲律宾的摄影师Kris Gids没有用大量的相机阵列就拍摄了子弹时间的特效，他只用了尼康D3300相机以60fps的帧率拍摄。
                    </div>
                </div>
            </div>
        </div>

        {% endfor %}

        <p style="margin-top: 60px;">
        <h3>发表评论</h3>
        <div>您的留言 （HTML标签部分可用）</div>

        <form action="">
            <!--<textparea rows="6" style="padding: 10px;width: 100%;background:transparent;border-radius: 5px;"-->
            <!--placeholder="发表你的看法"></textparea>-->
            <textarea placeholder="发表你的看法" rows="8"
                      style="padding: 10px;width: 100%;background:transparent;border-radius: 5px;"></textarea>

            <div>
                <div style="margin-top: 15px;margin-bottom: 5px;">
                    <label>您的称呼</label>
                </div>
                <input style="padding: 5px;border:1px solid #d3d3d3;border-radius: 2px;font-size: 1rem;"
                       size="30"
                       placeholder="称呼（必填）">
            </div>

            <div>
                <div style="margin-top: 15px;margin-bottom: 5px;">
                    <label>电子邮箱</label>
                </div>
                <input style="padding: 5px;border:1px solid #d3d3d3;border-radius: 2px;font-size: 1rem;"
                       size="30"
                       placeholder="邮箱（必填）">
            </div>

            <div>
                <div style="margin-top: 15px;margin-bottom: 5px;">
                    <label>个人网址</label>
                </div>
                <input style="padding: 5px;border:1px solid #d3d3d3;border-radius: 2px;font-size: 1rem;"
                       size="30"
                       placeholder="主页（选填）">
            </div>

            <input style="border:1px solid #d3d3d3;width: 10em;padding: 4px 0;margin-top: 20px;" type="submit"
                   value="提交">

        </form>

    </div>

</div>

</div>
{% else %}

<h2 class="post-title">The Post Not Found.</h2>

{% endif %}
{% endblock %}
