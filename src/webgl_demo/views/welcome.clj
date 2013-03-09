(ns webgl-demo.views.welcome
  (:require [webgl-demo.views.common :as common])
  (:use [noir.core :only [defpage]]
        [clojure.tools.logging :only [error info]]))

(defpage "/" []
  (info "landed on /")
  (common/layout
   [:div {:style "text-align: center"}
    [:p "FOO!"]
    [:canvas {:id "c" :style "width: 640px; height: 480px;"}]]))
