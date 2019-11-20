<template>
    <div class="main-container">
        <notifications group="bookings" position="top right" />
        <div class="bread-crumbs-cont">
            <bread-crumbs v-if="currentProduct.id" :name='currentProduct.name'/>
            <i18n-link to="/tours" class="back-to-search">
                <lx-svg-icon class="back-arrow-left" h="16px" w="16px" icon="arrow-left"/>
                Back to search
            </i18n-link>
        </div>
        <div class="tour-content" v-if="currentProduct.id">
            <div class="tour-header">
                <h1 class="tour-header-text">
                    {{currentProduct.name}}
                </h1>
                <div class="tour-secondary-sect">
                    <!--<div class="tour-secondary-sect-left">-->
                    <!--<img class="star-image" src="~assets/icons/star.svg" alt="star"/>-->
                    <!--<span class="stars">4.7</span>-->
                    <!--<div class="reviews">-->
                    <!--<span class="review">24K reviews&#8194;|&#8194;64K booked</span>-->
                    <!--&#8194;&#8194;|&#8194;&#8194;-->
                    <!--<span class="address">{{ currentProduct.firstPointOfPickUp.fullAddress.formatted_address }}</span>-->
                    <!--</div>-->
                    <!--</div>-->

                    <div class="add-to-wishlist" v-if="activeIcon" @click.stop="addWishList">
                        <lx-svg-icon icon="heart" w="24" h="24"/>
                        <span>Add To Wishlist</span>
                    </div>
                    <div class="add-to-wishlist" v-if="!activeIcon" @click.stop="removeWishList">
                        <lx-svg-icon icon="heart" w="24" h="24"/>
                        <span>Remove from Wishlist</span>
                    </div>
                </div>
            </div>

            <div class="desc-cont-wrapper">
                <div class="desc-cont">
                    <div class="slider slider-header-cont">
                        <hooper
                                id="first-slider"
                                ref="headerSlider"
                                :items-to-show="1"
                                :wheel-control="false"
                                :play-speed="5000"
                                auto-play
                                class="header-slider"
                                @slide="slideEventPagBar"
                        >
                            <slide
                                    v-for="(item, key) in currentProduct.productPhotos"
                                    :key="'productPhotos'+key"
                                    :style="{'background-image': `url(${ item ? url + item.thumbnails['754'] : ''})`}"
                                    :index="key"
                                    class="header-slide"
                            >
                                <div class="header-slide-bg"></div>
                            </slide>
                            <hooper-navigation slot="hooper-addons"></hooper-navigation>
                        </hooper>

                        <div class="pagination-bar">
                            <div v-for="(item, key) in currentProduct.productPhotos"
                                 :key="'pagProductPhotos'+key"
                                 :style="{'background-image': `url(${ item ? url + item.thumbnails['50'] : ''})`}"
                                 :class="key === currentSlide ? 'active-pag-bar': ''"
                                 class="pagination-item"
                                 @click="slideTo(key)"
                            >
                                <div class="pagination-item-opacity"></div>
                            </div>
                        </div>
                    </div>

                    <div class="desc-tabs">
                        <a
                                v-for="(item, key) in tabs"
                                :key="'tabs'+key"
                                v-smooth-scroll
                                :href="`#nav_${key + 1}`"
                                class="desc-tab"
                        >{{ item }}</a>
                    </div>

                    <div id="nav_1" class="highlights-cont">
                        <h2>Highlights</h2>

                        <div class="unique-block">
                            {{currentProduct.description_why_unique}}
                        </div>


                        <div class="bold-text">This tour best suited to:</div>
                        <ul>
                            <li v-for="(item, key) in currentProduct.groupEnjoyCategoriesList">
                                {{item.name}}
                            </li>
                        </ul>
                        <div class="bold-text">Type of travelers who would enjoy this tour:</div>
                        <ul>
                            <li v-for="(item, key) in currentProduct.travelerEnjoyCategoriesList">
                                {{item.name}}
                            </li>
                        </ul>

                        <div class="bold-text">What activities are included?</div>

                        <ul>
                            <li v-for="(item, key) in currentProduct.typeCategoriesList">
                                {{item.name}}
                            </li>
                        </ul>
                        <div class="bold-text">Themes for this tour:</div>

                        <ul>
                            <li v-for="(item, key) in currentProduct.themeCategoriesList">
                                {{item.name}}
                            </li>
                        </ul>
                        <div class="bold-text"> Health Restrictions</div>

                        <ul>
                            <li v-for="(item, key) in currentProduct.healthRestrictionCategoriesList">
                                {{item.name}}
                            </li>
                        </ul>

                        <div class="hr-gorizontal"></div>


                        <div class="highlights-list-cont">
                            <div class="highlights-list">
                                <div class="highlights-list-items">
                                    <div class="highlights-list-name">
                                        Operator
                                    </div>
                                    <div class="highlights-list-desc">
                                        {{currentProduct.operator.name}}
                                    </div>
                                </div>
                                <div class="highlights-list-items">
                                    <div class="highlights-list-name">
                                        Max Group Size:
                                    </div>
                                    <div class="highlights-list-desc">
                                        {{currentProduct.max_number_of_travelers}}
                                    </div>
                                </div>
                            </div>
                            <div class="highlights-list">
                                <div class="highlights-list-items">
                                    <div class="highlights-list-name">
                                        Guide language:
                                    </div>
                                    <div class="highlights-list-desc">
                                      <span v-for="(guideLang, guideIndex) in currentProduct.productGuides.personGuideLanguagesNames"
                                            :key="'guideIndex'+guideIndex">
                                            {{guideLang}}{{guideIndex==currentProduct.productGuides.personGuideLanguagesNames.length-1?'':','}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="highlights-list">
                                <div class="highlights-list-items">
                                    <div class="highlights-list-name">
                                        Physical Rating:
                                    </div>
                                    <div class="highlights-list-desc">
                                        {{currentProduct.productPhysicalRestrictions.physicalDifficultyLevelName}}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="hr-gorizontal"></div>
                    </div>

                    <div id="nav_2" class="itinerary-cont">
                        <div class="itinerary-header">
                            <h2 class="itinerary-header-text">
                                Itinerary
                            </h2>
                            <div class="itinerary-expand-all" @click="openScavengers">
                                Expand all
                            </div>
                        </div>

                        <div class="hr-gorizontal itinerary-hr"></div>

                        <scavenger
                                name="Start."
                                description="Pickup Location"
                                icon="pin-map"
                                color="#b5c9d5"
                                :active.sync="openedScavengerIndexesArray[0]"
                                v-if="currentProduct.productPickUpDropOff"
                        >
                            <div class="it-start-cont"
                                 v-for="(item,key) in currentProduct.productPickUpDropOff.pickUpPoints"
                                 :key="'pickUpPoints'+key">
                                <div class="it-start-left">
                                    <div class="it-start-left-header">
                                        {{item.place_name}} {{item.place_address}}, time
                                    </div>
                                    <div class="it-start-left-desc">
                                        {{item.description}}
                                    </div>
                                </div>

                                <div class="it-start-right">
                                    <div class="view-point-button">
                                        View start point on map
                                    </div>

                                    <no-ssr>
                                        <l-map :zoom="13" :center="[item.location.lat, item.location.lng]">
                                            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                                            <l-marker :lat-lng="[item.location.lat, item.location.lng]"></l-marker>
                                        </l-map>
                                    </no-ssr>
                                </div>
                            </div>
                        </scavenger>

                        <scavenger
                                v-for="(item, key) in currentProduct.productDays.days"
                                :key="'days'+key"
                                :name="(key+1)+''"
                                :description="item.title"
                                :icon="'pin-circle'"
                                :active.sync="openedScavengerIndexesArray[key+1]"
                        >
                            <div class="it-day-cont ">
                                <div v-for="(attraction, attractionKey) in item.attractions"
                                     :key="'attractionKey'+key+attractionKey"
                                     class="it-day-item it-start-cont">
                                    <div>
                                        <div class="it-day-item-header">
                                            {{attraction.place_name}} {{attraction.place_address}}
                                        </div>
                                        <div class="it-day-item-desc">
                                            {{attraction.description}}
                                        </div>
                                        <div class="it-day-item-time">
                                            {{attraction.duration}} Minutes, {{attraction.priceTypeName}}
                                        </div>
                                    </div>
                                    <div class="it-start-right" v-if="attraction.location">
                                        <div class="view-point-button">
                                            View attraction on map
                                        </div>

                                        <no-ssr>
                                            <l-map :zoom="13"
                                                   :center="[attraction.location.lat, attraction.location.lng]">
                                                <l-tile-layer
                                                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                                                <l-marker
                                                        :lat-lng="[attraction.location.lat, attraction.location.lng]"></l-marker>
                                            </l-map>
                                        </no-ssr>
                                    </div>

                                </div>

                            </div>
                            <div class="it-day-item-list">
                                <div v-if="item.meals.length" class="it-day-list">
                                    <div class="it-day-list-header">
                                        <lx-svg-icon class="it-list-icon" icon="meal" h="30px"
                                                     w="30px"></lx-svg-icon>
                                        <div class="it-day-list-header-text">
                                            Meals
                                        </div>
                                    </div>

                                    <div v-for="(meal, mealKey) in item.meals" :key="'mealKey'+mealKey"
                                         class="it-day-list-desc">
                                        <div class="it-day-list-desc-head">
                                            {{meal.categoryName}}
                                        </div>
                                        <div class="it-day-list-desc-text">
                                            {{meal.description}}
                                        </div>
                                    </div>


                                </div>
                                <div v-if="item.accomodations.length" class="it-day-list">
                                    <div class="it-day-list-header">
                                        <lx-svg-icon class="it-list-icon" icon="hotel" h="30px"
                                                     w="30px"></lx-svg-icon>
                                        <div class="it-day-list-header-text">
                                            Accomodations
                                        </div>
                                    </div>

                                    <div v-for="(accomodation, accomodationsKey) in item.accomodations"
                                         :key="'accomodationsKey'+accomodationsKey" class="it-day-list-desc">
                                        <div class="it-day-list-desc-head">
                                        </div>
                                        <div class="it-day-list-desc-text">
                                            {{accomodation.description}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </scavenger>

                        <scavenger
                                v-if="currentProduct.productPickUpDropOff"
                                name="End."
                                description="End Point Location"
                                icon="pin-flag"
                                color="#faab1a"
                                :active.sync="openedScavengerIndexesArray[currentProduct.productDays.days.length + 1]"
                        >
                            <div class="it-start-cont"
                                 v-for="(item,key) in currentProduct.productPickUpDropOff.dropOffPoints"
                                 :key="'dropOffPoints'+key">
                                <div class="it-start-left">
                                    <div class="it-start-left-header">
                                        {{item.place_name}} {{item.place_address}}, time
                                    </div>
                                    <div class="it-start-left-desc">
                                        {{item.description}}
                                    </div>
                                </div>

                                <div class="it-start-right">
                                    <div class="view-point-button">
                                        View start point on map
                                    </div>

                                    <no-ssr>
                                        <l-map :zoom="13" :center="[item.location.lat, item.location.lng]">
                                            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
                                            <l-marker :lat-lng="[item.location.lat, item.location.lng]"></l-marker>
                                        </l-map>
                                    </no-ssr>
                                </div>
                            </div>
                        </scavenger>
                    </div>

                    <div id="nav_3" class="whats-included-cont">
                        <h2>What's Included</h2>
                        <div class="included-list">
                            <div v-for="(item, key) in currentProduct.whatsIncludedCategoriesList"
                                 :key="'whatsIncludedCategoriesList'+key"
                                 class="included-list-item">
                                <lx-svg-icon
                                        icon="tick"
                                        h="20px"
                                        w="16px"
                                        class="green"
                                />
                                <div class="included-list-item-name">
                                    {{ item.name }}
                                </div>
                            </div>
                            <div v-for="(item, key) in currentProduct.whatsExcludedCategoriesList"
                                 :key="'whatsExcludedCategoriesList'+key"
                                 class="included-list-item">
                                <lx-svg-icon
                                        icon="close"
                                        h="20px"
                                        w="16px"
                                        class="red"
                                />
                                <div class="included-list-item-name">
                                    {{ item.name }}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id="nav_4" class="additional-info-cont">
                        <h2>Additional Info</h2>
                        <ul class="additional-info-list">
                            <li v-for="(item, key) in currentProduct.productPhysicalRestrictions.customAccessibilities"
                                :key="'customAccessibilities'+key">
                                {{ item }}
                            </li>
                            <li v-for="(item, key) in currentProduct.productPhysicalRestrictions.customHealthRestrictions"
                                :key="'customHealthRestrictions'+key">
                                {{ item }}
                            </li>
                        </ul>
                    </div>


                    <div class="cancellation-policy-cont">
                        <h2>Cancellation Policy</h2>
                        {{currentProduct.cancellationPolicy.typeName}}
                    </div>

                    <Reviews :currentProduct="currentProduct" :isUserCanAddReview="isUserCanAddReview" />
                    <div id="nav_5" class="availability-cont" :class="{'is-open' : availabilityCont}">
                        <h2>Availability</h2>
                        <div class="availability-cont__header" @click="availabilityCont = !availabilityCont ">
                            <div class="modal-content-title-icon" data-v-4127a8c6="">
                                <svg width="18px" height="18px" class="svg-icon" data-v-4127a8c6="">
                                    <use href="/lx-sprites.svg#users"></use>
                                </svg>
                                Travellers
                            </div>
                            <div class="fw-700 fz-13">
                                 <span v-for="(item,key) in activeBookingOptions.currentTourChosenGroups">
                                     <span v-if="item">{{item}} {{currentTourGroupIds[key].name}} </span>
                                 </span>
                            </div>
                            <lx-svg-icon class="arrow-down" h="16px" w="16px" icon="arrow-down"/>
                        </div>
                        <div class="availability-cont__content" v-show="availabilityCont">
                            <div class="availability-cont__spinners">
                                <people-select v-for="(item, key) in currentTourGroupIds"
                                               :value="activeBookingOptions.currentTourChosenGroups[key]"
                                               @change="chagePeopleAmount($event,key)"
                                               :name="item.name" :description="item.description"></people-select>
                            </div>
                            <vc-date-picker :attributes="schedule" v-model='chosenDate' locale="en" is-inline>
                                <div slot="day-content" slot-scope="{ day, attributes,dayEvents, dayProps }">
                                    <span v-if="day && day.label"
                                          v-on:click="dayEvents.click"
                                          v-on:mouseenter="dayEvents.mouseenter"
                                          v-on:mouseleave="dayEvents.mouseleave"
                                          v-on:focusin="dayEvents.focusin"
                                          v-on:focusout="dayEvents.focusout"
                                          v-on:keydown="dayEvents.keydown"
                                          :class="{'disabled':day.isDisabled, 'chosen':day.date.toISOString() == chosenDate}"
                                          class="vc-day-content vc-font-bold vc-text-white vc-font-medium vc-text-sm vc-cursor-pointer  vc-rounded-full"
                                    >
                                       {{day.label}}
                                    </span>
                                    <div v-if="attributes&&attributes[0]&&attributes[0].customData"
                                         class="calendar-money">
                                        <div class="calendar-money-wrapper">
                                            $ {{attributes[0].customData}}
                                        </div>
                                    </div>

                                </div>
                            </vc-date-picker>
                            <div class="availability-bucket">
                                <div
                                        class="availability-head"
                                >
                                    {{currentProduct.name}}
                                </div>

                                <div v-if="chosenDate" class="availability-date">
                                    {{chosenDate | formatDate}}
                                </div>

                                <div class="availability-bottom"
                                     v-if="activeBookingOptions.time && chosenDate && timeVariants">
                                    <div class="availability-price">
                                        <div class="availability-price-variety">
                                             <span v-for="(item,key) in activeBookingOptions.currentTourChosenGroups">
                                                <span v-if="item">{{item}} {{currentTourGroupIds[key].name}} </span>
                                            </span>
                                        </div>
                                        <div class="availability-price-total">
                                            Total: ${{activeBookingOptions.time.finalCost}}
                                        </div>
                                    </div>

                                    <div class="availability-add-busket" @click="showModal = true">
                                        Order now
                                    </div>
                                </div>

                                <div class="availability-bottom"
                                     v-if="!activeBookingOptions.time && chosenDate && timeVariants">
                                    <div class="availability-price">
                                        <div class="availability-price-variety">
                                            <div class="mb-10">
                                                Select an option for <strong>{{chosenDate | formatDate}}</strong>
                                            </div>
                                            <div class="modal-time__total mb-15">
                                                <div v-for="(item,key) in timeVariants"
                                                     class="modal-price-total modal-time__total-item fz-13"
                                                     v-on:click="chooseTime(item)">
                                                    <div class="color-blue">{{item.time}}</div>
                                                    <div class="color-black">$ {{item.finalCost}}</div>
                                                </div>
                                            </div>

                                            <span v-for="(item,key) in activeBookingOptions.currentTourChosenGroups">
                                                <span class="color-blue-dark fz-13" v-if="item">{{item}} {{currentTourGroupIds[key].name}} </span>
                                            </span>
                                            <div class="fw-600">Select time to book a tour</div>
                                        </div>

                                    </div>

                                    <div class="availability-add-busket" @click="showModal = true">
                                        Order now
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="buy-cont">
                    <div class="buy-tour">
                        <div class="buy-header">
                            <div class="buy-time">
                                <lx-svg-icon class="clock" h="17px" w="17px" icon="clock"/>
                                {{ currentProduct.days_count }} day{{currentProduct.days_count>1?'s':''}}
                            </div>
                            <span class="buy-from">From</span>
                        </div>

                        <div class="buy-price-container">
                            <!--<div class="buy-price-crossed">-->
                            <!--$-->
                            <!--<span class="buy-price-crossed-text">12092</span>-->
                            <!--</div>-->

                            <div class="buy-price">
                                <div class="buy-price-symbol">
                                    $
                                </div>
                                <div class="buy-price-text">
                                    {{ currentProduct.minPrice }}
                                </div>
                            </div>

                            <img class="hot-tour" src="~assets/icons/hot_tour.svg" alt="hot tour"/>
                        </div>

                        <div class="hr-gorizontal buy-hr-gorizontal"></div>

                        <div class="buy-price-selectors">
                            <div class="buy-price-select">
                                <lx-svg-icon h="14px" w="14px" icon="plus-secondary" class="plus-secondary"/>
                                NO BOOKING OR CREDIT CARD FEES
                            </div>

                            <div class="buy-price-select">
                                <lx-svg-icon h="14px" w="14px" icon="plus-secondary" class="plus-secondary"/>
                                BEST PRICE GUARANTEE Flexible
                            </div>

                            <div class="buy-price-select">
                                <lx-svg-icon h="14px" w="14px" icon="plus-secondary" class="plus-secondary"/>
                                FLEXIBLE PAYMENTS
                            </div>
                        </div>

                        <div class="buy-price-buttons">
                            <div class="add-to-basket" @click="showModal = true">
                                Order now
                            </div>
                            <div class="ask-a-question blue-button">
                                Ask a Question
                            </div>
                            <!--<div class="check-availability blue-button" v-on:click="showModalAction">-->
                            <!--Check Availability-->
                            <!--</div>-->
                        </div>
                    </div>
                </div>
            </div>

            <div class="customer-cont">
                <h2 class="h2-slider">
                    Customers Who Bought This Tour Also Bought
                </h2>
                <hooper :items-to-show="4" :wheel-control="false" :settings="firstSliderStgs"
                        class="take-another-slider">
                    <slide v-for="(item, key) in featuredProducts" :key="key" :index="key">
                        <card-offer
                                v-bind="item"
                                more-details
                                like
                        />
                    </slide>
                    <hooper-navigation slot="hooper-addons"></hooper-navigation>
                    <hooper-pagination slot="hooper-addons"></hooper-pagination>
                </hooper>
            </div>

            <div class="like-cont">
                <h2>You may also like</h2>
                <hooper :items-to-show="4" :wheel-control="false" :settings="firstSliderStgs"
                        class="take-another-slider">
                    <slide v-for="(item, key) in mixedProducts" :key="key" :index="key">
                        <card-offer
                                v-bind="item"
                                more-details
                                like
                        />
                    </slide>
                    <hooper-navigation slot="hooper-addons"></hooper-navigation>
                    <hooper-pagination slot="hooper-addons"></hooper-pagination>
                </hooper>
            </div>
        </div>
        <hooper-styles/>
        <modal v-if="showModal" @close="showModal = false">
            <div class="modal-date-price">
                <div class="modal-header">
                    {{currentProduct.name}}
                </div>

                <div class="modal-content">
                    <div class="modal-content-inner">
                        <div class="modal-content-left">
                            <div class="modal-content-title-icon">
                                <lx-svg-icon h="18px" w="18px" icon="users"/>
                                Travellers
                            </div>
                            <people-select v-for="(item, key) in currentTourGroupIds"
                                           :value="activeBookingOptions.currentTourChosenGroups[key]"
                                           @change="chagePeopleAmount($event,key)"
                                           :name="item.name" :description="item.description"></people-select>

                            <!--<div class="modal-content-spinner">-->
                            <!--<div class="modal-content-spinner-info">-->
                            <!--<div class="modal-content-spinner-title">Adults</div>-->
                            <!--<div class="modal-content-spinner-number">18-54</div>-->
                            <!--</div>-->
                            <!--<div class="modal-content-spinner-box">-->
                            <!--<div class="modal-content-spinner-item">-->
                            <!--<lx-svg-icon h="18px" w="18px" icon="minus"/>-->
                            <!--</div>-->
                            <!--<div class="modal-content-spinner-sum">2</div>-->
                            <!--<div class="modal-content-spinner-item">-->
                            <!--<lx-svg-icon h="18px" w="18px" icon="plus-secondary"/>-->
                            <!--</div>-->
                            <!--</div>-->
                            <!--</div>-->
                        </div>
                        <div class="modal-content-right">
                            <vc-date-picker :attributes="schedule" v-model='chosenDate'
                                            locale="en" is-inline>
                                <div slot="day-content" slot-scope="{ day, attributes,dayEvents, dayProps }">
                                    <span v-if="day && day.label"
                                          v-on:click="dayEvents.click"
                                          v-on:mouseenter="dayEvents.mouseenter"
                                          v-on:mouseleave="dayEvents.mouseleave"
                                          v-on:focusin="dayEvents.focusin"
                                          v-on:focusout="dayEvents.focusout"
                                          v-on:keydown="dayEvents.keydown"
                                          :class="{'disabled':day.isDisabled, 'chosen':day.date.toISOString() == chosenDate}"
                                          class="vc-day-content vc-font-bold vc-text-white vc-font-medium vc-text-sm vc-cursor-pointer  vc-rounded-full"
                                    >
                                       {{day.label}}
                                    </span>
                                    <div v-if="attributes&&attributes[0]&&attributes[0].customData"
                                         class="calendar-money">
                                        <div class="calendar-money-wrapper">
                                            $ {{attributes[0].customData}}
                                        </div>
                                    </div>

                                </div>
                            </vc-date-picker>
                        </div>
                    </div>
                </div>

                <div class="hr-gorizontal"></div>

                <div v-if="activeBookingOptions.time && chosenDate && timeVariants" class="modal-price">
                    <div class="modal-price-left">
                        <div class="modal-price-date">
                            {{chosenDate | formatDate}}
                        </div>
                        <div class="modal-prices">
                            <span v-for="(item,key) in activeBookingOptions.currentTourChosenGroups">
                                <span v-if="item">${{activeBookingOptions.time.separateCost[currentTourGroupIds[key].name]}} × {{item}} {{currentTourGroupIds[key].name}} </span>
                            </span>
                        </div>
                    </div>
                    <div class="modal-price-total">
                        Total: ${{activeBookingOptions.time.finalCost}}
                    </div>

                </div>
                <div v-if="!activeBookingOptions.time && chosenDate && timeVariants" class="modal-time">
                    <div class="mb-10">
                        Select an option for <strong>{{chosenDate | formatDate}}</strong>
                    </div>
                    <div class="modal-time__total mb-15">
                        <div v-for="(item,key) in timeVariants" class="modal-price-total modal-time__total-item fz-13"
                             v-on:click="chooseTime(item)">
                            <div class="color-blue">{{item.time}}</div>
                            <div class="color-black">$ {{item.finalCost}}</div>
                        </div>
                    </div>
                    <div v-if="maximum.available_places_left" class="maximums">
                        <div class="maximum">
                            <div class="maximum-title">Places left:</div>
                            <div class="maximum-value">{{ maximum.available_places_left }}</div>
                        </div>
                        <div class="maximum">
                            <div class="maximum-title">Maximum people per booking:</div>
                            <div class="maximum-value">{{ maximum.max_travelers_per_booking }}</div>
                        </div>
                    </div>
                    <span v-for="(item,key) in activeBookingOptions.currentTourChosenGroups">
                        <span class="color-blue-dark fz-13"
                              v-if="item">{{item}} {{currentTourGroupIds[key].name}} </span>
                    </span>
                    <div class="fw-600 color-blue-dark">Select time to book a tour</div>
                </div>


                <div class="modal-buttons">
                    <div class="modal-cancel" @click="showModal = !showModal">
                        Cancel
                    </div>
                    <router-link :to="/bookings/ + currentProduct.id" class="modal-continue">
                        Continue
                    </router-link>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import {
        Hooper,
        Slide,
        Navigation as HooperNavigation,
        Pagination as HooperPagination
    } from 'hooper'
    import moment from 'moment'
    import HooperStyles from '@/components/HooperStyles'
    import 'hooper/dist/hooper.css'
    import mockData from '@/mockdata/mockData'
    import CardOffer from '@/components/cards/CardOfferNew'
    import PeopleSelect from '@/components/selects/PeopleSelect'
    import BreadCrumbs from '@/components/BreadCrumbs'
    import LxSvgIcon from '@/components/LxSvgIcon'
    import Modal from '@/components/Modal'
    import Scavenger from '@/components/Scavenger'
    import Reviews from '@/components/Reviews'
    import {mapState, mapActions} from 'vuex';
    import serverConfig from '@/config/server'


    export default {
        head() {
            return {
                titleTemplate: `Booking-tours.com | ${this.currentProduct.name}`
            }
        },
        auth: false,
        validate() {
            return true
        },
        components: {
            Hooper,
            Slide,
            HooperNavigation,
            HooperPagination,
            HooperStyles,
            CardOffer,
            BreadCrumbs,
            LxSvgIcon,
            Modal,
            Scavenger,
            PeopleSelect,
            Reviews

        },
        props: ['id'],
        watch: {
            currentProduct(newValue, oldValue) {
                for (let i = 0; i <= newValue.productDays.days.length + 1; i++) {
                    this.openedScavengerIndexesArray[i] = true;
                }
                this.openedScavengerIndexesArray = JSON.parse(JSON.stringify(this.openedScavengerIndexesArray))

            },
            user(newValue, oldValue) {
            },
        },
        async created() {
            this.getFeaturedProducts();
            this.getMixedProducts();
            this.$store.dispatch('products/getCurrentProduct', this.$route.params.id);
            if (this.user.id) {
                await this.getUserWishList();
                this.$store.dispatch('products/getReviewPermision',this.$route.params.id)
                const wishlist = this.userWishlist.filter(item => item.id === parseInt(this.$route.params.id));
                if (wishlist.length === 1) this.activeIcon = false
            }
        },
        data() {
            return {
                ...mockData,
                activeIcon: true,
                myDate: new Date(),
                tabs: [
                    'Highlights',
                    'Itinerary',
                    `What's Included`,
                    'Additional Info',
                    'Availability'
                ],
                openedScavengerIndexesArray: [false, false, false, false],
                firstSliderStgs: {
                    breakpoints: {
                        1190: {
                            itemsToShow: 3
                        },
                        768: {
                            itemsToShow: 2
                        },
                        320: {
                            itemsToShow: 1
                        }
                    }
                },
                reviewList: [
                    {name: 'Excellent', percent: '80%'},
                    {name: 'Good', percent: '50%'},
                    {name: 'Average', percent: '0%'},
                    {name: 'Rather Poor', percent: '0%'},
                    {name: 'Bad', percent: '20%'}
                ],
                reviewComments: [
                    {
                        name: 'nishana i',
                        assessment: '4.7',
                        date: 'Jan 2018',
                        desc:
                            'If you cancel between 3 and 6 day(s) in advance of the scheduled departure, there is a 50 percent cancellation fee. If you cancel within 2 day(s) of the scheduled departure, there is a 100 percent cancellation fee. If you cancel at least 7 day(s) in advance of the scheduled departure, there is no cancellation fee.'
                    },
                    {
                        name: 'nishana i',
                        assessment: '4.7',
                        date: 'Jan 2018',
                        desc:
                            'If you cancel between 3 and 6 day(s) in advance of the scheduled departure, there is a 50 percent cancellation fee. If you cancel within 2 day(s) of the scheduled departure, there is a 100 percent cancellation fee. If you cancel at least 7 day(s) in advance of the scheduled departure, there is no cancellation fee.'
                    },
                    {
                        name: 'nishana i',
                        assessment: '4.7',
                        date: 'Jan 2018',
                        desc:
                            'If you cancel between 3 and 6 day(s) in advance of the scheduled departure, there is a 50 percent cancellation fee. If you cancel within 2 day(s) of the scheduled departure, there is a 100 percent cancellation fee. If you cancel at least 7 day(s) in advance of the scheduled departure, there is no cancellation fee.'
                    },
                    {
                        name: 'nishana i',
                        assessment: '4.7',
                        date: 'Jan 2018',
                        desc:
                            'А нас тут 5'
                    },
                    {
                        name: 'nishana i',
                        assessment: '4.7',
                        date: 'Jan 2018',
                        desc:
                            'If you cancel between 3 and 6 day(s) in advance of the scheduled departure, there is a 50 percent cancellation fee. If you cancel within 2 day(s) of the scheduled departure, there is a 100 percent cancellation fee. If you cancel at least 7 day(s) in advance of the scheduled departure, there is no cancellation fee.'
                    }
                ],
                lang: {
                    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
                    placeholder: {
                        date: 'Select Date',
                        dateRange: 'Select Date Range'
                    }
                },
                activeEnd: false,
                activeStart: false,
                activeDays: [false, false],
                activeScavenger: true,
                currentSlide: 0,
                showModal: false,
                availabilityCont: false
            }
        },
        methods: {
            ...mapActions('products', ['getFeaturedProducts', 'getMixedProducts']),
            ...mapActions('wishlist', ['getUserWishList']),
            addWishList() {
                if (this.user.id !== undefined) {
                    this.$store.dispatch('wishlist/addWishList', this.$route.params.id);
                    this.activeIcon = !this.activeIcon
                }
            },
            removeWishList() {
                this.$store.dispatch('wishlist/removeWishList', this.$route.params.id);
                this.activeIcon = !this.activeIcon
            },
            openScavengers() {
                this.openedScavengerIndexesArray.forEach(function (part, index) {
                    this[index] = false;
                }, this.openedScavengerIndexesArray); // use arr as this
                this.openedScavengerIndexesArray = JSON.parse(JSON.stringify(this.openedScavengerIndexesArray))
            },
            showModalAction() {
                this.showModal = true
            },
            chooseTime(time) {
                let result = {time: time};
                this.$store.dispatch('booking/setBookingOprions', result);
            },
            chagePeopleAmount(event, param) {

                let allCount = 0;

                let compContext = this;

                Object.keys(this.activeBookingOptions.currentTourChosenGroups).forEach(function(key) {
                    if(key == param){
                        allCount += event;
                    }else{
                        allCount += compContext.activeBookingOptions.currentTourChosenGroups[key];
                    }
                })

                if(allCount < 1){
                    this.$notify({
                        type: 'error',
                        group: 'bookings',
                        title: 'Travelers Count',
                        text: 'Travellers count should be greater than 0',
                        duration: 3500,
                        speed: 1000
                    })
                    return true;
                }else{
                    if(this.maximum){
                        if(allCount > this.maximum.available_places_left){
                            this.$notify({
                                type: 'error',
                                group: 'bookings',
                                title: 'Travelers Count',
                                text: 'Only '+ this.maximum.available_places_left +' places left on current date.',
                                duration: 3500,
                                speed: 1000
                            })
                            return true;
                        }
                        if(allCount > this.maximum.max_travelers_per_booking){
                            this.$notify({
                                type: 'error',
                                group: 'bookings',
                                title: 'Travelers Count',
                                text: 'Maximum travellers count per booking on current tour is '+ this.maximum.max_travelers_per_booking,
                                duration: 3500,
                                speed: 1000
                            })
                            return true;
                        }
                    }
                }


                let result = {currentTourChosenGroups: Object.assign({}, this.activeBookingOptions.currentTourChosenGroups)};
                result.currentTourChosenGroups[param] = event;
                result.time = null;
                this.$store.dispatch('booking/setBookingOprions', result);
            },
            slideEventPagBar(slide) {
                this.currentSlide = slide.currentSlide
            },
            slideTo(indexSlide) {
                this.$refs.headerSlider.slideTo(indexSlide)
            }
        },
        computed: {
            ...mapState('products', ['currentProduct', 'featuredProducts', 'mixedProducts']),
            ...mapState('booking', ['activeBookingOptions', 'currentTourGroupIds']),
            ...mapState('wishlist', ['userWishlist']),
             ...mapState('products', ['isUserCanAddReview']),
            ...mapState('auth', ['user']),
            chosenDate: {
                get: function () {
                    return this.$store.state.booking.chosenDate
                },
                // сеттер:
                set: function (date) {
                    if (date) {
                        const newDate = new Date(date).toISOString();
                        this.$store.dispatch('booking/setBookingDate', newDate);
                    } else {
                        this.$store.dispatch('booking/setBookingDate', date);
                    }
                }
            },

            timeVariants() {
                let d = new Date(this.chosenDate);
                d.setTime(d.getTime() - d.getTimezoneOffset() * 60 * 1000);

                let item = this.schedule.find((item) => item.dates === d.toISOString())
                if (item) {
                    let result = [];
                    for (let time in item.time.data) {

                    let ending = parseInt(time) >= (60 * 12) ? 'PM' : 'AM';

                    let hoursString = String(Math.floor(parseInt(time) / 60)).length > 1 ? String(Math.floor(parseInt(time) / 60)) : '0' + String(Math.floor(parseInt(time) / 60));
                    let minutesString = String(Math.floor(parseInt(time) % 60)).length > 1 ? String(Math.floor(parseInt(time) % 60)) : '0' + String(Math.floor(parseInt(time) % 60));
                    let formattedTime = hoursString + ':' + minutesString;
                    if(time == -100){
                        formattedTime = 'All day';
                    }
            //let formattedTime = (Math.floor(parseInt(time) / 60)) + ':' + (parseInt(time) % 60) + ' ' + ending;

                        let itemToPush = {time: formattedTime, finalCost: 0, separateCost: {}}
                        let timeItem = item.time.data[time];
                        for (let groupId in timeItem) {
                            itemToPush.finalCost += this.activeBookingOptions.currentTourChosenGroups[groupId] * timeItem[groupId].price;
                            if (itemToPush.separateCost[this.currentTourGroupIds[groupId].name] == undefined) itemToPush.separateCost[this.currentTourGroupIds[groupId].name] = 0;
                            itemToPush.separateCost[this.currentTourGroupIds[groupId].name] += this.activeBookingOptions.currentTourChosenGroups[groupId] * timeItem[groupId].price;
                        }
                        result.push(itemToPush)

                    }
                    return result;
                } else {
                    return undefined;
                }
            },
            maximum(){
                let d = new Date(this.chosenDate);
                d.setTime(d.getTime() - d.getTimezoneOffset() * 60 * 1000);

                let item = this.schedule.find((item) => item.dates === d.toISOString())
                if(item){

                    let data = {};
                    data.available_places_left = item.time.available_places_left;
                    data.max_travelers_per_booking = item.time.max_travelers_per_booking;

                    return data;
                }else{
                    return null;
                }
            },
            activeDates() {
                let result = [];
                this.schedule.forEach(item => {
                    result.push({
                        start: item.dates, end: item.dates
                    })

                })
                return result;
            },
            schedule() {
                let result = [];
                let totalPeople = 0
                if (this.currentProduct && this.currentProduct.availableSheldule) {

                let defaultNeeded = {};
                for (let index in this.activeBookingOptions.currentTourChosenGroups) {
                   defaultNeeded[index] = !!this.activeBookingOptions.currentTourChosenGroups[index]
                   totalPeople += this.activeBookingOptions.currentTourChosenGroups[index];
                }
                // Connot run foreach on object, the previous code is commented
                let compContext = this;


                Object.keys(this.currentProduct.availableSheldule).forEach(function(key) {

                    const data = compContext.currentProduct.availableSheldule[key];
                    //console.log(data, "Sheldule??");

                    let item = {
                        dates: new Date(data.day).toISOString(),
                        highlight: {
                            contentClass: 'available', // Class provided by TailwindCSS
                        },
                        time: { data: {}, defaultPrice: false },
                    }

                        if (data.times) {
                            for (let time in data.times) {

                                let needed = defaultNeeded;

                        let timeItem = data.times[time]
                        let newItem = {}
                        let defaultPrice = false
                        let skipAll = false;

                        if (timeItem && timeItem['prices'] && timeItem.available_places_left >= totalPeople && timeItem.max_travelers_per_booking >= totalPeople) {

                                    timeItem['prices'].forEach(price => {
                                        //если нет дефолтной цены, то пытаемся вычислить
                                        if (!item.time.defaultPrice) {
                                            //добавляем дефолтную цену если ее нет
                                            defaultPrice += price.price * compContext.activeBookingOptions.currentTourChosenGroups[price.product_age_group_id];
                                        }
                                        if (needed[price.product_age_group_id]) needed[price.product_age_group_id] = false;
                                        //если нет места под того, кого мы ищем, скипаем полностью добавление

                                        newItem[price.product_age_group_id] = {price: price.price}
                                    })
                                    //добавляем время если мы его не скипаем
                                    let allTrue = true;
                                    for (var o in needed)
                                        if (needed[o]) allTrue = false;

                                    if (!skipAll && allTrue) {
                                        item.time.data[time] = newItem;
                                        item.time['available_places_left'] = timeItem['available_places_left'];
                                        item.time['max_travelers_per_booking'] = timeItem['max_travelers_per_booking'];
                                        if (!item.time.defaultPrice && defaultPrice) {
                                            item.time.defaultPrice = defaultPrice
                                            item.customData = defaultPrice
                                        }
                                    }


                                }

                            }
                        }
                        result.push(item)
                    });

//          this.currentProduct.availableSheldule.forEach(data => {
//            let item = {
//              dates: new Date(data.day).toISOString(),
//              highlight: {
//                contentClass: 'available', // Class provided by TailwindCSS
//              },
//              time: { data: {}, defaultPrice: false },
//            }
//
//            if (data.times) {
//              for (let time in data.times) {
//
//                let needed = defaultNeeded;
//
//                let timeItem = data.times[time]
//                let newItem = {}
//                let defaultPrice = false
//                let skipAll = false;
//
//                console.log(timeItem)
//                console.log(timeItem['prices'])
//                console.log(timeItem.available_places_left >= totalPeople)
//
//                if (timeItem && timeItem['prices'] && timeItem.available_places_left >= totalPeople) {
//
//                  timeItem['prices'].forEach(price => {
//                    //если нет дефолтной цены, то пытаемся вычислить
//                    if (!item.time.defaultPrice) {
//                      //добавляем дефолтную цену если ее нет
//                      defaultPrice += price.price * this.activeBookingOptions.currentTourChosenGroups[price.product_age_group_id];
//                    }
//                    if (needed[price.product_age_group_id]) needed[price.product_age_group_id] = false;
//                    //если нет места под того, кого мы ищем, скипаем полностью добавление
//
//                    newItem[price.product_age_group_id] = { price: price.price }
//                  })
//                  //добавляем время если мы его не скипаем
//                  let allTrue = true;
//                  for (var o in needed)
//                    if (needed[o]) allTrue = false;
//
//                  if (!skipAll && allTrue) {
//                    item.time.data[time] = newItem;
//                    if (!item.time.defaultPrice && defaultPrice) {
//                      item.time.defaultPrice = defaultPrice
//                      item.customData = defaultPrice
//                    }
//                  }
//
//
//                }
//
//              }
//            }
//            result.push(item)
//          })
                }
                return result;

            },
            url() {
                return serverConfig.defaultUploadURL;
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/module-variables";

    .calendar-money {
        position: absolute;
        left: 50%;
        width: 100%;
        bottom: -10px;
    }

    .calendar-money-wrapper {
        position: relative;
        left: -50%;
        width: 100%;
        text-align: center;
    }

    .main-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .bread-crumbs-cont {
        display: flex;
        justify-content: space-between;
        max-width: 1141px;
        width: 100%;
        margin-top: 30px;
        margin-bottom: 20px;
    }

    .slider {
        display: flex;
        justify-content: center;
        height: 31.7rem;
        width: 1050px;
        margin-top: 2.5rem;
    }

    .slider-bottom {
        padding-left: 12px;
    }

    .fixed-bar {
        position: fixed;
    }

    .header-slide {
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .header-slider {
        max-width: 754px;
        height: 406px;
    }

    .header-slide {
        position: relative;
    }

    .slider-header-cont {
        margin-top: 0;
        margin-left: 0;
        margin-bottom: -15px;
        height: 406px;
        position: relative;
        max-width: 754px;
        z-index: 1;
    }

    .pagination-bar {
        position: absolute;
        bottom: 0;
        display: flex;
    }

    .pagination-item {
        height: 50px;
        width: 50px;
        cursor: pointer;
        margin-bottom: 2px;
        border: 2px solid #faac1a00;
        background-repeat: no-repeat;
        background-size: cover;

        &:hover {
            border: 2px solid #faab1a;
        }
    }

    .pagination-item-opacity {
        opacity: 0;
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        transition: all ease 0.3s;

        &:hover {
            opacity: 0.15;
        }
    }

    .active-pag-bar {
        border: 2px solid #faab1a;
    }

    .scavenger-cont {

    }

    .header-slide-bg {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30%;
        transform: rotate(180deg);
        background-image: linear-gradient(
                        0deg,
                        rgba(12, 22, 31, 0) 1%,
                        rgba(4, 30, 46, 0.55) 100%
        );
    }

    .buy-hr-gorizontal {
        margin-top: 14px;
        margin-bottom: 0;
    }

    .back-to-search {
        width: 136px;
        font-size: 13px;
        color: #6b94ac;
    }

    .stars {
        font-weight: 600;
        color: $yellow;
        font-size: 14px;
        line-height: 28px;
        margin-left: 4px;
        margin-right: 8px;
    }

    .buy-time {
        font-weight: 500;
        font-size: 14px;
    }

    .tour-header-text {
        font-weight: 700;
        font-size: 32px;
    }

    .clock {
        margin-right: 5px;
    }

    .tour-content {
        width: 100%;
        max-width: 1141px;
    }

    .it-start-left {
        padding: 0 30px;
    }

    .it-start-left-header {
        font-size: 14px;
        font-weight: 500;
        color: $dark-secondary;
        margin-bottom: 11px;
    }

    .it-start-cont {
        display: flex;
        justify-content: space-between;
        margin-bottom: 18px;
        width: 100%;
    }

    .it-start-left-desc {
        font-size: 14px;
        color: $blue-dark;
    }

    .it-day-cont {
        padding-left: 30px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .it-day-list-header {
        display: flex;
        margin-top: 13px;
        align-items: center;
    }

    .it-day-list-desc {
        padding-left: 35px;
        margin-bottom: 15px;
    }

    .take-another-slider {
        display: flex;
        justify-content: center;
        height: 31.7rem;
        width: 1300px;
        margin-top: 2.5rem;
    }

    .it-day-list-desc-head {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .it-list-icon {
        margin-right: 5px;
        color: #6b94ac;
    }

    .it-day-list-header-text {
        font-weight: 700;
        color: $dark-secondary;
        font-size: 14px;
    }

    .it-day-list-desc-text {
        font-size: 14px;
    }

    .it-day-list-desc-not-include {
        font-weight: 500;
        font-size: 13px;
        color: #6b94ac;
        margin-top: 5px;
    }

    .it-start-right {
        height: 165px;
        min-width: 356px;
        position: relative;
    }

    .view-point-button {
        width: 188px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $blue-light;
        font-size: 13px;
        font-weight: 500;
        position: absolute;
        z-index: 1010;
        border-radius: 3px;
        box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        bottom: 20px;
        left: 85px;
        transition: background-color 0.3s ease;
        cursor: pointer;

        &:hover {
            background-color: rgb(243, 243, 243);
        }
    }

    .add-to-wishlist {
        font-size: 13px;
        color: $blue;
        cursor: pointer;
        margin-left: 20px;
        display: flex;
        align-items: flex-end;
        transition: color 0.3s ease;

        &:hover {
            color: $blue-light;
        }
    }

    .tour-secondary-sect {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    .tour-secondary-sect-left {
        display: flex;
    }


    .star-image {
        width: 20px;
        height: 20px;
        margin-top: 3px;
    }

    .back-arrow-left {
        margin-right: 5px;
        margin-bottom: 2px;
    }

    .buy-tour {
        min-width: 362px;
        max-width: 362px;
        height: 406px;
        border: 1px solid #e6edf1;
        padding: 21px 25px 29px 25px;
        position: sticky;
        top: 15px;
    }

    .buy-price {
        font-size: 16px;
        font-weight: 700;
        display: flex;
        align-items: center;
    }

    .buy-price-text {
        font-size: 26px;
        margin-left: 3px;
    }

    .hot-tour {
        width: 24px;
        height: 24px;
        margin-top: 8px;
        margin-left: 5px;
    }

    .highlights-list-cont {
        display: flex;
    }

    .highlights-list {
        width: 33.33333%;
    }

    .highlights-list-items {
        margin-bottom: 16px;
    }

    .highlights-list-name {
        font-size: 13px;
        font-weight: 500;
    }

    .highlights-list-desc {
        font-weight: 500;
        font-size: 14px;
        margin-top: 5px;
    }

    .buy-price-container {
        display: flex;
        justify-content: flex-end;
    }

    .buy-price-crossed,
    .buy-price {
        display: flex;
    }

    .buy-price-crossed {
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
    }

    .buy-price-crossed-text {
        text-decoration: line-through;
        margin-left: 5px;
        margin-right: 10px;
    }

    .buy-price-selectors {
        margin-bottom: 24px;
        margin-top: 24px;
        font-weight: 500;
        font-size: 13px;
    }

    .buy-price-select {
        margin-top: 12px;
        display: flex;
        align-items: center;
    }

    .plus-secondary {
        margin-right: 12px;
        color: #6b94ac;
    }

    .included-list-item {
        display: flex;
        align-items: center;
        margin-top: 10px;
    }

    .included-list-item-name {
        font-size: 14px;
        margin-left: 20px;
    }

    .green {
        color: $green;
    }

    .red {
        color: $red;
    }

    .add-to-basket,
    .ask-a-question,
    .review-bottom-button,
    .check-availability,
    .review-header-button,
    .availability-add-busket {
        width: 100%;
        border-radius: 3px;
        margin-top: 12px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .add-to-basket,
    .availability-add-busket,
    .modal-continue {
        font-size: 14px;
        font-weight: 700;
        background-color: $orange;
        transition: all ease 0.3s;

        &:hover {
            background-color: $yellow;
        }
    }

    .blue-button {
        border: 1px solid $blue-light;
        font-weight: 500;
        font-size: 14px;
        color: $blue-light;
        transition: all ease 0.3s;

        &:hover {
            background-color: $blue-light;
            color: white;
        }
    }

    .buy-cont,
    .buy-header {
        display: flex;
        justify-content: space-between;
    }

    .desc-cont-wrapper {
        display: flex;
        margin-top: 28px;
        justify-content: space-between;
    }

    .desc-cont {
        display: flex;
        flex-direction: column;
        max-width: 754px;
        width: 100%;
    }

    .desc-tabs {
        display: flex;
        background-color: #fff;
        width: 100%;
        max-width: 754px;
        position: sticky;
        background-color: #fff;
        top: 0;
        z-index: 2010;
        margin-top: 20px;
    }

    .desc-tab {
        height: 75px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding-top: 35px;
        border-bottom: 1px solid #e6edf1;
        font-weight: 500;
        text-decoration: none;
        cursor: pointer;
        transition: all ease 0.3s;

        &:hover {
            border-bottom: 2px solid $blue-light;
            color: $blue-light;
        }
    }

    .modal-content {
        width: 100%;
    }

    .modal-buttons {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 30px;
    }

    .like-cont {
        margin-bottom: 4rem;
    }

    .itinerary-hr {
        margin-bottom: 0;
    }

    .itinerary-expand-all {
        font-size: 13px;
        color: #6b94ac;
        margin-top: 20px;
        transition: color 0.3s ease;
        cursor: pointer;

        &:hover {
            color: $blue;
        }
    }

    .itinerary-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .itinerary-header-text {
        margin-top: 0;
        margin-bottom: 0;
    }

    .it-day-item {
        margin-bottom: 18px;
    }

    .it-day-item-header {
        font-weight: 700;
        font-size: 14px;
    }

    .it-day-item-desc {
        color: $blue-dark;
        font-size: 14px;
        margin: 6px 0;
    }

    .it-day-item-time {
        font-weight: 500;
        color: #6b94ac;
        font-size: 13px;
    }

    html .modal-date-price {
        padding: 34px;
        width: 100%;
        align-items: flex-start;
    }

    .modal-header {
        font-size: 18px;
        color: $dark-secondary;
        font-weight: 700;
    }

    .modal-cancel,
    .modal-continue {
        height: 40px;
        width: 95px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 4.5px;
        cursor: pointer;
        margin: 0 5px;
    }

    .modal-cancel {
        background-color: #e6edf1;
        color: #2980b9;
        font-weight: 500;
        font-size: 13px;

        &:hover {
            background-color: #dcecf7;
        }
    }

    .modal-date-price {
        font-size: 13px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .availability-bottom {
        display: flex;
        justify-content: space-between;
    }

    .availability-add-busket {
        width: 217px;
        margin-top: 0;
    }

    .availability-head {
        font-size: 18px;
        font-weight: 700;
        color: $dark-secondary;
        max-width: 700px;
        margin-top: -10px;
        margin-bottom: 10px;
    }

    .availability-price-variety {
        font-size: 14px;
        margin-top: 5px;
    }

    .availability-price-total, .modal-price-total {
        color: $dark-secondary;
        font-size: 16px;
        font-weight: 500;
    }

    .modal-price {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
    }

    @media (max-width: 1190px) {
        .slider-bottom {
            width: 675px;
        }

        .like-cont, .customer-cont {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .customer-cont {
            margin-top: 20px;
        }

        .desc-cont-wrapper {
            display: flex;
            flex-direction: column;
        }

        .tour-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 754px;
        }

        .desc-cont {
            order: 2;
        }

        .buy-cont {
            order: 1;
            padding-bottom: 10px;
        }

        .buy-tour {
            width: 100%;
            max-width: 100%;
            height: 300px;
        }

        .buy-price-buttons {
            display: flex;
        }

        .bread-crumbs-cont {
            max-width: 754px;
        }

        .blue-button, .add-to-basket {
            border-radius: 0;
        }
    }

    @media (max-width: 768px) {
        .buy-price-buttons {
            flex-direction: column;
        }

        .buy-tour {
            height: 406px;
        }

        .main-container, .bread-crumbs-cont, .tour-header, .desc-cont {
            padding: 0 10px;
        }

        .desc-cont {
            padding: 0;
        }

        .tour-header-text {
            font-size: 24px;
        }

        .slider-bottom {
            width: 345px;
            margin-top: 10px;
            height: 30rem;
        }

        .header-slider, .slider-header-cont {
            width: 100%;
            max-width: 100%;
            height: 300px;
        }

        .header-slide {
            width: 100% !important;
        }

        .highlights-list-cont {
            justify-content: space-around;
        }

        .highlights-list {
            width: 150px;
        }

        .desc-tabs {
            font-size: 13px;
            justify-content: space-around;
        }

        .desc-tab {
            padding-top: 10px;
        }

        .h2-slider {
            padding: 0 5%;
            text-align: center;
        }

        .it-start-cont {
            flex-direction: column;
        }

        .view-point-button {
            left: 10px;
        }

        .it-start-right {
            margin: 17px 30px 0px 30px;
        }

        .included-list, .additional-info-list {
            margin-left: 10px;
        }


        .back-to-search {
            width: 166px;
        }

        .like-cont, .customer-cont {
            margin-top: 20px;
        }


    }

    @media (max-width: 550px) {
        .tour-header-text {
            font-size: 20px;
        }

        .tour-secondary-sect {
            flex-direction: column;
        }

        .add-to-wishlist {
            margin-left: 0;
        }

        .slider-bottom {
            width: 285px;
        }
    }

    @media (max-width: 475px) {
        .buy-tour {
            min-width: 250px;
        }
    }

    h2 {
        font-size: 24px;
        margin-top: 36px;
        margin-bottom: 24px;
    }

    p,
    span {
        font-size: 14px;
    }

    ul {
        font-size: 14px;
        line-height: 28px;
        padding-left: 17px;
    }

    .is-full-width .mx-datepicker {
        width: 100%;
    }

    .modal-content-title-icon {
        font-size: 13px;
        color: #052e46;
        font-weight: 500;
        margin-bottom: 25px;
        display: flex;
        align-items: center;

        svg {
            margin-right: 10px;
        }
    }

    .modal-header {
        margin-bottom: 25px;
    }


    .modal-content-right {
        padding-left: 25px;
        margin-left: 25px;
        border-left: 1px solid #e6edf1;
        width: 100%;
    }

    .modal-price {
        border-top: 1px solid #e6edf1;
        padding-top: 20px;
    }

    .modal-content-inner {
        display: flex;
        align-items: flex-start;
    }

    .modal-time {
        &__total {
            display: flex;
        }

        &__total-item {
            text-align: center;
            border-left: 1px solid #e6edf1;
            transition: all .2s;
            cursor: pointer;
            padding: 2px 15px;

            &:hover {
                background-color: #e6edf1;
            }

            &.is-selected {
                background-color: #2980B9;

                .color-blue, .color-black {
                    color: #fff;
                }
            }

            &:last-child {
                border-right: 1px solid #e6edf1;
            }
        }
    }

    .availability-cont {

        &__header {
            display: flex;
            cursor: pointer;
            align-items: center;
            justify-content: space-between;
            position: relative;
            padding: 10px 30px 10px 10px;
            border: 1px solid #b5c9d5;
            border-radius: 2px;
            background-color: #ffffff;
            font-size: 13px;
            color: #01080c;
            font-weight: 400;
            margin-bottom: 7px;

            .is-open & {
                border-color: $orange;
            }

            .modal-content-title-icon {
                margin-bottom: 0;

                svg {
                    color: #6b94ac;
                }
            }

            .arrow-down {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                transition: all .2s;

                .is-open & {
                    transform: translateY(-50%) rotate(180deg);
                    top: 51%;
                }
            }
        }


        &__spinners {
            display: flex;
            align-items: center;
            padding: 18px 22px;
            border-radius: 4px;
            background-color: #ffffff;
            margin-bottom: 10px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

            .modal-content-spinner {
                margin-bottom: 0;
                margin-right: 30px;

                &:last-child {
                    margin-right: 0;
                }
            }
        }

        .availability-bucket {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e6edf1;
        }


    }

    .it-day-item-list {
        margin-left: 25px;
    }


    @media (max-width: 768px) {
        h2 {
            font-size: 20px;
            margin-top: 26px;
            margin-bottom: 20px;
        }

        .hooper-next, .hooper-prev {
            margin-top: 1rem !important;
        }
    }

    .bold-text {
        font-weight: 700;
    }

    .unique-block {
        margin-bottom: 20px;
    }

    .like-icon {
        fill: red !important;
    }
    .maximums{
        overflow: auto;
        .maximum{
            overflow: auto;
            .maximum-title{
                float: left;
                font-weight: 700;
            }
            .maximum-value{
                float: left;
                margin-left: 5px;
            }
        }
    }
</style>
