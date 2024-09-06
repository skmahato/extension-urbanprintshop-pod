// import { containerCSS } from "react-select/dist/declarations/src/components/containers";

(() => {
  console.log("Riverr App Loaded 1.0V");

  // document.getElementsByTagName("head")[0].appendChild(link);

  const loadScript = (urls, callback) => {
    urls.forEach((url, idx, array) => {
      var script = document.createElement("script");
      script.type = "text/javascript";

      // If the browser is Internet Explorer.
      if (script.readyState) {
        script.onreadystatechange = () => {
          if (
            script.readyState == "loaded" ||
            script.readyState == "complete"
          ) {
            script.onreadystatechange = null;
            if (idx === array.length - 1) {
              callback();
            }
          }
        };
        // For any other browser.
      } else {
        script.onload = () => {
          if (idx === array.length - 1) {
            callback();
          }
        };
      }

      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    });
  };

  const NotifyScript = (jQuery) => {
    let product_id =
        typeof ShopifyAnalytics !== "undefined"
          ? ShopifyAnalytics.meta.product.id
          : window.riverrProductID,
      shop = Shopify.shop;
    jQuery.ajax({
      url: `https://riverr-enterprise-user.uc.r.appspot.com/products/check-customizable/${product_id}`,
      type: "get",
      success: function (response) {
        // console.log(response);

        response.customizable &&
          jQuery("#riverr-btn").parents("body").addClass("riverr-ctrl");
      },
    });

    jQuery("#riverr-btn").on("click", function () {
      // console.log('Clicked');

      // jQuery.ajax({
      //     type: "post",
      //           url: "https://riverr-test.myshopify.com/cart/add.js",
      //           dataType: "json",
      //           data: {
      //             items: [
      //               {
      //                 quantity: 5,
      //                 id: ShopifyAnalytics.meta.selectedVariantId,
      //                 properties: {
      //                   "Estimeted Between": "extra data",
      //                 },
      //               },
      //             ],
      //         }
      // })

      window.location.href =
        "https://" + Shopify.shop + "/apps/river?pid=" + window.riverrProductID;
    });
  };

  scripts = [];

  if (typeof jQuery === "undefined" || parseFloat(jQuery.fn.jquery) < 1.7) {
    scripts.unshift(
      "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"
    );
  }

  const AddCustomizeButtonClass = (jQuery) => {
    let themeName = (Shopify?.theme?.name || "dawn").toLowerCase();
    let className = "dawn-theme-customize-button";

    switch (themeName) {
      case "dawn":
        className = "dawn-theme-customize-button";
        break;
      // case y:
      //   className = "dawn-theme-customize-button";
      //   break;
      default:
        className = "dawn-theme-customize-button";
    }

    jQuery("#riverr-btn").addClass(className);
  };

  loadScript(scripts, () => {
    jQuery191 = jQuery.noConflict(true);

    if (jQuery == undefined) {
      jQuery = jQuery191;
    }
    NotifyScript(jQuery);
    AddCustomizeButtonClass(jQuery);
  });
})();

// var myTimezoneName = "Asia/Colombo";
