(ns webgl-demo.views.common
  (:use [noir.core :only [defpartial]]
        [hiccup.page :only [include-css include-js html5]]))

(defpartial layout [& content]
  (html5
   [:head
    [:title "webgl-demo"]
    (include-css "/css/reset.css")
    (include-js "/js/webgl-utils.js"
                "/js/webgl-debug.js"
                "/js/jquery-1.9.1.min.js"
                "/js/log.js"
                "/js/webgl-demo.js")]
   [:body
    [:div#wrapper
     content]]))
