{% extends "layout.tpl" %}
{% block content %}
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

    <div style="margin-top: 60px;">
        <h3>发表评论</h3>
        <div>您的留言 （HTML标签部分可用）</div>
        <textarea style="height: 120px;padding: 10px;width: 100%;background:transparent;border-radius: 5px;"
                  placeholder="发表你的看法"></textarea>

        <div>
            <label>您的称呼</label>
            <input style="background: transparent;padding: 5px;" placeholder="姓名（必填）">
            <div>电子邮箱</div>
            <input style="background: transparent;padding: 5px;" placeholder="邮箱（必填）">
            <div>个人网址</div>
            <input style="background: transparent;padding: 5px;" placeholder="主页（选填）">
            <span class="button previous">
                    <a href="#">
                        <span class="button__text">发表</span>
                    </a>
                </span>

        </div>

    </div>

</div>
{% endblock %}
