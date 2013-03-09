(defproject webgl-demo "0.1.0"
            :description "Something simple using WebGL"
            :dependencies [[org.clojure/clojure "1.4.0"]
                           [noir "1.3.0-beta3"]
                           [ring "1.1.0"]
                           [ring-server "0.2.5"]
                           [org.clojure/tools.logging "0.2.3"]
                           [clj-logging-config "1.9.10"]]
            :plugins [[lein-ring "0.7.5"]]
            :ring {:handler webgl-demo.server/handler}
            :main webgl-demo.server)

