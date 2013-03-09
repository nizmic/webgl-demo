(ns webgl-demo.views.welcome
  (:require [webgl-demo.views.common :as common]
            [noir.content.getting-started])
  (:use [noir.core :only [defpage]]
        [clojure.tools.logging :only [error info]]))

(defpage "/welcome" []
  (info "welcome page")
  (common/layout
   [:p "Welcome to webgl-demo"]))
