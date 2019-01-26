<!DOCTYPE html>
<html lang="zh">
<head>
    <link rel="stylesheet" href="/public/css/style.css" type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700|Source+Code+Pro' rel='stylesheet'
          type='text/css'>
</head>
<body class="dark-theme">
<div class="container">
    <header class="header">
  <span class="header__inner">
<a href="#" style="text-decoration: none;">
  <div class="logo">
      <!--<img src="#" alt=""/>-->
      <span class="logo__mark">></span>
      <span class="logo__text">hello friend</span>
      <span class="logo__cursor"></span>
  </div>
</a>
    <span class="header__right">
<nav class="menu">
  <ul class="menu__inner">
      <li><a href="#">About</a></li>
      <li><a href="#">Showcase</a></li>
  </ul>
</nav>
        <span class="menu-trigger">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </span>
      <span class="theme-toggle">
<svg class="theme-toggler" width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
  3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
  13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z"/>
</svg>

      </span>
    </span>
  </span>
    </header>

    <div class="content">

        <div class="posts">
            <div class="post on-list">
                <h1 class="post-title"><a href="#">发布主题到 Hexo 官方主题库</a></h1>
                <div class="post-meta">
        <span class="post-date">
          Feb 26 2017
        </span>
                    <span class="post-author"> Written by Radek</span>
                </div>

                <span class="post-tags">
            #<a href="Android">Android</a>&nbsp;
            #<a href="Ios">Ios</a>&nbsp;
        </span>
                <img src="/public/img/hello.jpg" class="post-cover"/>

                <div class="post-content">
                    三天前把主题：PolarBear 上传到了 Github. 这是人生中第一个开源项目，又收获了第一个 star, excited! (and first issue…)

                    接着把它提交到官方站时，遇到了不少问题。网上关于这部分的资料太少了，所以我在这里写一下教程。
                </div>
                <div><a class="read-more button" href="#">ReadMore →</a></div>
            </div>

            <!--pagination-->
            <div class="pagination">
                <div class="pagination__buttons">
                    {{ if .Paginator.HasPrev }}
                    <span class="button previous">
        <a href="#">
          <span class="button__icon">←</span>
          <span class="button__text">Newer posts</span>
        </a>
      </span>
                    {{ end }}
                    {{ if .Paginator.HasNext }}
                    <span class="button next">
        <a href="#">
          <span class="button__text">Older posts</span>
          <span class="button__icon">→</span>
        </a>
      </span>
                    {{ end }}
                </div>
            </div>
            <!--pagination-->
        </div>

    </div>

    <footer class="footer">
        <div class="footer__inner">
            <!--<div class="copyright copyright&#45;&#45;user">-->
            <!---->
            <!--</div>-->

            <a href="#" style="text-decoration: none;">
                <div class="logo">
                    <!--<img src="#" alt=""/>-->
                    <span class="logo__mark"></span>
                    <span class="logo__text">hello friend</span>
                    <span class="logo__cursor"></span>
                </div>
            </a>

            <div class="copyright">
                <span>© 2019 Powered by <a href="http://gohugo.io">Hugo</a></span>
                <span>Theme created by <a href="https://twitter.com/panr">panr</a></span>
            </div>
        </div>
    </footer>
    <script src="/public/js/main.js"></script>
    <script src="/public/js/prism.js"></script>
</div>
</body>
</html>
