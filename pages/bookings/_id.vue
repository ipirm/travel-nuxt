<template>
    <div class="main-container">
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
                    <span v-for="(item,key) in activeBookingOptions.currentTourChosenGroups">
                        <span class="color-blue-dark fz-13"
                              v-if="item">{{item}} {{currentTourGroupIds[key].name}} </span>
                    </span>
                    <div class="fw-600 color-blue-dark">Select time to book a tour</div>
                </div>


                <div class="modal-buttons">
                    <div class="modal-cancel" @click="showModal = !showModal">
                        Done
                    </div>
                </div>
            </div>
        </modal>

        <div class="left-block">
            <notifications group="bookings" position="top right" />
            <div class="main-title">
                <h1>{{ currentProduct.name }}</h1>
            </div>
            <div class="line"></div>
            <div class="points">
                <div class="point">
                    <div class="point-number">
                        <div class="point-number-square">
                            1
                        </div>
                    </div>
                    <div class="point-content">
                        <div class="content-title">Select your departure date</div>
                        <div class="content-dates">
                            <div class="travel-date">
                                <div class="heading">Travel date:</div>
                                <div class="value">{{ chosenDate | formatDate}}</div>
                            </div>
                            <div class="end-date">
                                <div class="heading">End date:</div>
                                <div class="value">{{chosenDate | formatDate}}</div>
                            </div>
                        </div>
                        <div @click="openDateModal" class="change-date">
                            Change date
                        </div>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="points">
                <div class="point">
                    <div class="point-number">
                        <div class="point-number-square">
                            2
                        </div>
                    </div>
                    <div class="point-content">
                        <div class="content-title">Add traveller details</div>
                        <div class="info-block">
                            <label>Number of passengers:</label>
                            <div class="groups-numbers">
                                <people-select v-for="(item, key) in currentTourGroupIds"
                                               :value="activeBookingOptions.currentTourChosenGroups[key]"
                                               @change="chagePeopleAmount($event,key)"
                                               :name="item.name" :description="item.description"></people-select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div v-if="currentProduct.id" class="lead-traveller-block">
                <div v-for="(item,index) in travelers" v-if="index == 0" class="traveller">
                    <div class="title">
                        Lead Traveller:
                    </div>
                    <div class="traveller-input">
                        <div class="input-heading">Title*</div>
                        <div class="radios">
                            <div class="radio">
                                <input v-model="travelers[index].title" value="mr" :id="index + 'mr'" type="radio">
                                <label :for="index + 'mr'">Mr.</label>
                            </div>
                            <div class="radio">
                                <input v-model="travelers[index].title" value="ms" :id="index + 'ms'" type="radio">
                                <label :for="index + 'ms'">Ms.</label>
                            </div>
                            <div class="radio">
                                <input v-model="travelers[index].title" value="mrs" :id="index + 'mrs'" type="radio">
                                <label :for="index + 'mrs'">Mr.</label>
                            </div>
                            <div class="radio">
                                <input v-model="travelers[index].title" value="miss" :id="index + 'miss'" type="radio">
                                <label :for="index + 'miss'">Miss.</label>
                            </div>
                        </div>
                    </div>
                    <div class="traveller-input">
                        <div class="input-heading text-input-heading">First Name*</div>
                        <input v-model="travelers[index].first_name" type="text" class="form-control text-input">
                    </div>
                    <div class="traveller-input">
                        <div class="input-heading text-input-heading">Last Name*</div>
                        <input v-model="travelers[index].last_name" type="text" class="form-control text-input">
                    </div>
                    <div class="traveller-input">
                        <div class="input-heading text-input-heading">Email*</div>
                        <input v-model="travelers[index].email" type="text" class="form-control text-input">
                    </div>
                    <div class="traveller-input">
                        <div class="input-heading text-input-heading">Phone Number*</div>
                        <basic-select isPhone :index="index" @selected-option="setPhoneIndex" class="traveler-select" :options="phoneIndexes" :default-option="phoneIndexes[0]" placeholder="International Calling Code" />
                        <input v-model="travelers[index].phone_number" type="text" class="form-control select-text-input">
                    </div>
                    <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_date_of_birth_needed" class="traveller-input">
                        <div class="input-heading text-input-heading">Date of Birth*</div>
                        <basic-select @selected-option="setDay" :index="index" class="traveler-select-days" :options="days" :default-option="days[0]" placeholder="dd" />
                        <basic-select @selected-option="setMonth" :index="index" class="traveler-select-months" :options="months" :default-option="months[0]" placeholder="mm" />
                        <basic-select @selected-option="setYear" :index="index" class="traveler-select-years" :options="years" :default-option="years[0]" placeholder="yyyy" />
                    </div>
                    <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_gender_needed" class="traveller-input">
                        <div class="input-heading">Gender*</div>
                        <div class="radios">
                            <div class="radio">
                                <input v-model="travelers[index].gender" value="male" id="male" type="radio">
                                <label for="male">Male</label>
                            </div>
                            <div class="radio">
                                <input v-model="travelers[index].gender" value="female" id="female" type="radio">
                                <label for="female">Female</label>
                            </div>
                        </div>
                    </div>
                    <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_nationality_needed" class="traveller-input">
                        <div class="input-heading text-input-heading">Nationality*</div>
                        <div class="radios">
                            <basic-select @selected-option="setNationality" :index="index" class="traveler-select-nationalities" :options="nationalities" :default-option="nationalities[0]" placeholder="dd" />
                        </div>
                    </div>
                    <div class="line bottom-line"></div>
                </div>
                <div v-for="(item,index) in travelers" v-if="(index != 0) && (currentProduct.bookingNeededInformationFromTraveler.is_full_name_needed || currentProduct.bookingNeededInformationFromTraveler.is_date_of_birth_needed || currentProduct.bookingNeededInformationFromTraveler.is_gender_needed || currentProduct.bookingNeededInformationFromTraveler.is_nationality_needed)" class="traveller basic-traveller">
                    <div class="title">
                        Traveller {{ index + 1 }}:
                    </div>
                    <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_full_name_needed" class="traveller-input">
                        <div class="input-heading">Title*</div>
                        <div class="radios">
                            <div class="radio">
                                <input v-model="travelers[index].title" value="mr" :id="index + 'mr'" type="radio">
                                <label :for="index + 'mr'">Mr.</label>
                            </div>
                            <div class="radio">
                                <input v-model="travelers[index].title" value="ms" :id="index + 'ms'" type="radio">
                                <label :for="index + 'ms'">Ms.</label>
                            </div>
                            <div class="radio">
                                <input v-model="travelers[index].title" value="mrs" :id="index + 'mrs'" type="radio">
                                <label :for="index + 'mrs'">Mr.</label>
                            </div>
                            <div class="radio">
                                <input v-model="travelers[index].title" value="miss" :id="index + 'miss'" type="radio">
                                <label :for="index + 'miss'">Miss.</label>
                            </div>
                        </div>
                    </div>
                    <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_full_name_needed" class="traveller-input">
                        <div class="input-heading text-input-heading">First Name*</div>
                        <input v-model="travelers[index].first_name" type="text" class="form-control text-input">
                    </div>
                    <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_full_name_needed" class="traveller-input">
                        <div class="input-heading text-input-heading">Last Name*</div>
                        <input v-model="travelers[index].last_name" type="text" class="form-control text-input">
                    </div>
                    <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_date_of_birth_needed" class="traveller-input">
                        <div class="input-heading text-input-heading">Date of Birth*</div>
                        <basic-select @selected-option="setDay" :index="index" class="traveler-select-days" :options="days" :default-option="days[0]" placeholder="dd" />
                        <basic-select @selected-option="setMonth" :index="index" class="traveler-select-months" :options="months" :default-option="months[0]" placeholder="mm" />
                        <basic-select @selected-option="setYear" :index="index" class="traveler-select-years" :options="years" :default-option="years[0]" placeholder="yyyy" />
                    </div>
                    <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_gender_needed" class="traveller-input">
                        <div class="input-heading">Gender*</div>
                        <div class="radios">
                            <div class="radio">
                                <input v-model="travelers[index].gender" value="male" :id="index + 'male'" type="radio">
                                <label :for="index + 'male'">Male</label>
                            </div>
                            <div class="radio">
                                <input v-model="travelers[index].gender" value="female" :id="index + 'female'" type="radio">
                                <label :for="index + 'female'">Female</label>
                            </div>
                        </div>
                    </div>
                    <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_nationality_needed" class="traveller-input">
                        <div class="input-heading text-input-heading">Nationality*</div>
                        <div class="radios">
                            <basic-select @selected-option="setNationality" :index="index" class="traveler-select-nationalities" :options="nationalities" :default-option="nationalities[0]" placeholder="dd" />
                        </div>
                    </div>
                    <div class="line bottom-line"></div>
                </div>
            </div>
            <div class="traveler-info-block" v-if="currentProduct.id">
                <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_arrival_flight_details_needed || currentProduct.bookingNeededInformationFromTraveler.is_departure_flight_details_needed || currentProduct.bookingNeededInformationFromTraveler.is_arrival_ship_details_needed || currentProduct.bookingNeededInformationFromTraveler.is_departure_ship_details_needed || currentProduct.bookingNeededInformationFromTraveler.is_arrival_train_details_needed || currentProduct.bookingNeededInformationFromTraveler.is_departure_train_details_needed" class="points">
                <div class="point">
                    <div class="point-number">
                        <div class="point-number-square">
                            3
                        </div>
                    </div>
                    <div v-if="currentProduct.id" class="point-content pickup-point-content">
                        <div class="content-title">Pickup Information</div>

                        <div class="pickup-description">
                            {{ currentProduct.productPickUpDropOff.pickUpDescription }}
                        </div>
                        <div class="points-block-start">
                            <div class="start-end-points">Start point: <span>{{ currentProduct.productPickUpDropOff.pickUpPoints[0].place_name }}</span></div>
                            <div v-if="currentProduct.productPickUpDropOff.dropOffPoints.lenght" class="start-end-points">End point: <span>{{ currentProduct.productPickUpDropOff.dropOffPoints[0].place_name }}</span></div>
                        </div>
                        <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_arrival_flight_details_needed" class="hotel-input">

                            <div class="hotel-input-heading">Arrival flight details</div>
                            <input v-model="arrival_flight_details" type="text" class="form-control hotel-input-input">
                        </div>
                        <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_departure_flight_details_needed" class="hotel-input">
                            <div class="hotel-input-heading">Departure flight details</div>
                            <input v-model="departure_flight_details" type="text" class="form-control hotel-input-input">
                        </div>
                        <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_arrival_ship_details_needed" class="hotel-input">
                            <div class="hotel-input-heading">Arrival ship details</div>
                            <input v-model="arrival_ship_details" type="text" class="form-control hotel-input-input">
                        </div>
                        <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_departure_ship_details_needed" class="hotel-input">
                            <div class="hotel-input-heading">Departure ship details</div>
                            <input v-model="departure_ship_details" type="text" class="form-control hotel-input-input">
                        </div>
                        <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_arrival_train_details_needed" class="hotel-input">
                            <div class="hotel-input-heading">Arrival train details</div>
                            <input v-model="arrival_train_details" type="text" class="form-control hotel-input-input">
                        </div>
                        <div v-if="currentProduct.bookingNeededInformationFromTraveler.is_departure_train_details_needed" class="hotel-input">
                            <div class="hotel-input-heading">Departure train details</div>
                            <input v-model="departure_train_details" type="text" class="form-control hotel-input-input">
                        </div>
                        <div class="line hotel-line"></div>
                    </div>
                </div>
            </div>
            </div>
            <div v-show="paypalData.invoice_id" class="points">
                <div class="point">
                    <div class="point-number">
                        <div class="point-number-square">
                            4
                        </div>
                    </div>
                    <div class="point-content pickup-point-content">
                        <div class="content-title">Add payment details</div>
                        <div class="pickup-description">
                            Select your payment method:
                        </div>
                        <!--<div class="pay-by-card">-->
                            <!--<div class="title-block">-->
                                <!--<div class="left-card-block">-->
                                    <!--<input id="card" value="card" type="radio">-->
                                    <!--<label for="card" class="title">Pay by card</label>-->
                                <!--</div>-->
                                <!--<div class="right-card-block">-->
                                    <!--<div class="logos">-->
                                        <!--<div class="card-logo visa-logo">-->
                                        <!--</div>-->
                                        <!--<div class="card-logo mastercard-logo">-->
                                        <!--</div>-->
                                        <!--<div class="card-logo american-logo">-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->

                            <!--</div>-->
                            <!--<div class="contents-block">-->
                                <!--<div class="card-input">-->
                                    <!--<div class="heading">-->
                                        <!--Cardholder Name-->
                                    <!--</div>-->
                                    <!--<div class="value">-->
                                        <!--<input placeholder="Le. John Smith" type="text">-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div class="card-input">-->
                                    <!--<div  class="heading">-->
                                        <!--Card Number-->
                                    <!--</div>-->
                                    <!--<div class="value">-->
                                        <!--<input placeholder="**** **** **** ****" type="text">-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div class="card-input">-->
                                    <!--<div class="heading">-->
                                        <!--Expiry Date-->
                                    <!--</div>-->
                                    <!--<div class="value">-->
                                        <!--<input placeholder="MM/YYYY" type="text">-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--<div class="card-input">-->
                                    <!--<div class="heading">-->
                                        <!--CVV-->
                                    <!--</div>-->
                                    <!--<div class="value">-->
                                        <!--<input placeholder="123" type="text">-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <div class="pay-by-card">
                            <div class="title-block">
                                <div class="left-card-block">
                                    <input v-model="paymentMethod" id="paypal" type="radio">
                                    <label for="paypal" class="title">Pay with Paypal</label>
                                </div>
                                <div class="right-card-block">
                                    <div class="logos">
                                        <div class="card-logo paypal-logo">
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="contents-block-paypal">
                                <!--<div v-if="showPayPalButton" v-on:click="renderBtn(paypalData)" class="paypal-button">Sign in to PayPal</div>-->
                                <!--<button v-on:click="renderBtn(paypalData)">render btn</button>-->
                                <div id="paypal-button-container"></div>
                                <div v-if="payPalLoading" class="loading-spinner-bg">
                                    <loading-spinner :loading="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!paypalData.invoice_id" class="accept-terms">
                <input id="accept-checkbox" v-model="acceptTerms" class="checkbox form-check-input" type="checkbox">
                <label for="accept-checkbox">I accept Terms & Conditions and Privacy Policy; and Expat Explore Travel's payment, cancellation and refund conditions.</label>
            </div>
            <div v-if="!paypalData.invoice_id" class="order-button-block">
                <button :disabled="!acceptTerms || bookingLoading" @click.prevent="addBooking" class="add-button">
                    Proceed to payment
                </button>
                <div v-if="bookingLoading" class="loading-spinner-bg">
                    <loading-spinner :loading="true" />
                </div>
            </div>
        </div>
        <div class="right-block">
            <div class="main-title">My trip</div>
            <div class="secondary-title">{{ currentProduct.name }}</div>
            <div class="duration">{{ currentProduct.productDays ? currentProduct.productDays.days.length : 0 }} day</div>
            <div class="start-end-block" v-if="currentProduct.productPickUpDropOff">
                <div v-if="currentProduct.productPickUpDropOff.pickUpPoints.length > 0" class="start-block">
                    <div class="start-svg-icon"></div>
                    <div class="heading">
                        <div class="heading-title">Start in {{ currentProduct.productPickUpDropOff.pickUpPoints[0].place_name }}</div>
                        <div class="heading-body">{{chosenDate | formatDate}}</div>
                    </div>
                </div>
                <div v-if="currentProduct.productPickUpDropOff.dropOffPoints.length > 0" class="end-block">
                    <div class="end-svg-icon"></div>
                    <div class="heading">
                        <div class="heading-title">Ends in {{ currentProduct.productPickUpDropOff.dropOffPoints[0].place_name }}</div>
                        <div class="heading-body">{{chosenDate | formatDate}}</div>
                    </div>
                </div>
            </div>
            <div class="included-block">
                <div class="included">
                    <div class="title">What's included</div>
                    <div class="body"><span v-for="incl in currentProduct.whatsIncludedCategoriesList">{{ incl.name }},</span></div>
                </div>
                <div class="included">
                    <div class="title">What's not included</div>
                    <div class="body"><span v-for="excl in currentProduct.whatsExcludedCategoriesList">{{ excl.name }},</span></div>
                </div>
            </div>
            <div class="right-line"></div>
            <div class="number-of-travelers">
                <div class="heading">
                    <div class="number-title">
                        <div class="number-title-heading">Number of Travellers</div>
                        <div class="number-title-body"><span v-for="(item, key) in currentTourGroupIds">{{ item.name }} - {{ activeBookingOptions.currentTourChosenGroups[key] }}, </span></div>
                    </div>
                    <div class="number-number">{{ overallCount }}</div>
                </div>
            </div>
            <div class="right-line-second"></div>
            <div class="tour-prices-block">
                <div class="tour-price">
                    <div class="left-price-block">
                        <div class="heading">Tour price:</div>
                        <!--<div class="body-block">$1,000 x 2</div>-->
                    </div>
                    <div class="right-price-block">
                        ${{ activeBookingOptions.time ? activeBookingOptions.time.finalCost : 0 }}
                    </div>
                </div>
                <div class="ammount-due">
                    <div class="left-price-block">
                        <div class="heading">Amount due</div>
                    </div>
                    <div class="right-price-block">
                        $ <span class="price">{{ activeBookingOptions.time ? activeBookingOptions.time.finalCost : 0 }}</span>
                    </div>
                </div>
                <div class="ask-question">
                    Ask a question
                </div>
                <div class="terms-and-condition">
                    <div class="title">Terms and conditions</div>
                    <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapState, mapActions, mapGetters } from 'vuex';
    import windowWidth from '@/mixins/windowWidth'
    import PeopleSelect from '@/components/selects/PeopleSelect'
    import SelectOptions from '@/components/selects/SelectOptions'
    import BasicSelect from '@/components/selects/BasicSelectNew'
    import InputSelect from '@/components/selects/InputSelect'
    import LxSvgIcon from '@/components/LxSvgIcon'
    import moment from 'moment'
    import Modal from '@/components/Modal'

    export default {
        head () {
            return {
                titleTemplate: `Booking-tours.com | Book`,
            }
        },
        auth: false,
        components: {
            PeopleSelect,
            SelectOptions,
            BasicSelect,
            LxSvgIcon,
            Modal,
            InputSelect
        },
        mixins: [windowWidth],
        data: () => ({
            days: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
                '31'
            ],
            months: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12'
            ],
            years: [
                '1920',
                '1921',
                '1922',
                '1923',
                '1924',
                '1925',
                '1926',
                '1927',
                '1928',
                '1929',
                '1930',
                '1931',
                '1932',
                '1933',
                '1934',
                '1935',
                '1936',
                '1937',
                '1938',
                '1939',
                '1940',
                '1941',
                '1942',
                '1943',
                '1944',
                '1945',
                '1946',
                '1947',
                '1948',
                '1949',
                '1950',
                '1951',
                '1952',
                '1953',
                '1954',
                '1955',
                '1956',
                '1957',
                '1958',
                '1959',
                '1960',
                '1961',
                '1962',
                '1963',
                '1964',
                '1965',
                '1966',
                '1967',
                '1968',
                '1969',
                '1970',
                '1971',
                '1972',
                '1973',
                '1974',
                '1975',
                '1976',
                '1977',
                '1978',
                '1979',
                '1980',
                '1981',
                '1982',
                '1983',
                '1984',
                '1985',
                '1986',
                '1987',
                '1988',
                '1989',
                '1990',
                '1991',
                '1992',
                '1993',
                '1994',
                '1995',
                '1996',
                '1997',
                '1998',
                '1999',
                '2001',
                '2002',
                '2003',
                '2004',
                '2005',
                '2006',
                '2007',
                '2008',
                '2009',
            ],
            nationalities: [
                'Russian',
                'German',
                "indian"
            ],

            travelers: [
            ],
            overallCount: 0,
            overallPrice: null,
            showModal: false,
            arrival_flight_details: null,
            departure_flight_details: null,
            arrival_ship_details: null,
            departure_ship_details: null,
            arrival_train_details: null,
            departure_train_details: null,
            showPayPalButton: true,
            acceptTerms: false,
            loading: true,
            curInvoiceId: null,
            payPalLoading: false,
            paymentMethod: 'paypal'
        }),
        watch: {
            activeBookingOptions: {
                handler: function(newValue) {

                    let count = 0;
                    let compContext = this;
                    Object.keys(newValue.currentTourChosenGroups).forEach(function(key) {
                        count += newValue.currentTourChosenGroups[key];
                    });

                    this.overallCount = count;

                    if( count > this.travelers.length ){
                        let countToAdded = count - this.travelers.length;
                        for( var i = 0; i < countToAdded; i++ ){
                            this.travelers.push({
                                is_lead_traveler: false,
                                title: "",
                                first_name: "",
                                last_name: "",
                                email: "",
                                phone_country_id: null,
                                phone_number: "",
                                date_of_birth: "",
                                day: "",
                                month: "",
                                year: '',
                                gender: "",
                                nationality: "",
                                weight: 0,
                                passport_details: "231321312312"
                            })
                        }
                    }
                    if( count < this.travelers.length ){
                        this.travelers = this.travelers.splice(0, count);
                    }
                },
                deep: true
            },
            paypalData: {
                handler: function(newValue, oldValue) {
                    if(newValue.invoice_id){
                        if(this.curInvoiceId != newValue.invoice_id){
                            console.log('new value incoice id', newValue.invoice_id)
                            this.renderBtn(newValue);
                        }
                        this.curInvoiceId = newValue.invoice_id;

                    }
                },
            }
        },
        computed: {
            ...mapState('products', ['currentProduct']),
            ...mapState('booking', ['activeBookingOptions', 'currentTourGroupIds','paymentMethods','bookingLoading']),
            ...mapState('ui', ['phoneIndexes','phoneIndexesCore']),
            ...mapState('booking', ['paypalData']),


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
        methods:{
            ...mapActions('ui', ['getPhoneIndexes']),
            ...mapActions('booking', ['createBooking','getChosenDate','getPaymentMethods','nullPayPal']),
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

                let result = { currentTourChosenGroups: Object.assign({}, this.activeBookingOptions.currentTourChosenGroups) };
                result.currentTourChosenGroups[param] = event;

                this.$store.dispatch('booking/setBookingOprions', result);

                if(this.timeVariants){
                    if(this.timeVariants[0]){
                        this.chooseTime(this.timeVariants[0])
                    }else{
                        this.chooseTime(null)
                    }
                }
            },
            chooseTime(time) {
                let result = { time: time };
                this.$store.dispatch('booking/setBookingOprions', result);
            },
            addBooking(){
                this.travelers[0].is_lead_traveler = 1;
                let compContext = this;
                this.travelers.forEach((item,key) => {
                    if(key > 0){
                        compContext.travelers[key].is_lead_traveler = 0;
                    }else{
                        compContext.phoneIndexesCore.forEach(element => {
                            if (element.international_calling_code === compContext.travelers[key].phone_country_id) {
                                compContext.travelers[key].phone_country_id = element.id
                            }
                        })
                        compContext.travelers[key].phone_country_id = compContext.travelers[key].phone_country_id ? compContext.travelers[key].phone_country_id : '3';
                    }

                    compContext.travelers[key].date_of_birth = compContext.generateDateOfBirth(compContext.travelers[key]);
                    if(!compContext.travelers[key].nationality && compContext.currentProduct.bookingNeededInformationFromTraveler.is_nationality_needed){
                        compContext.travelers[key].nationality = 'Russian';
                    }

                });


                let perPerson = [];
                Object.keys(this.activeBookingOptions.currentTourChosenGroups).forEach(function(key) {
                    if(parseInt(key) > 0){
                        if(compContext.activeBookingOptions.currentTourChosenGroups[key] > 0){
                            perPerson.push({
                                product_age_group_id: parseInt(key),
                                quantity: compContext.activeBookingOptions.currentTourChosenGroups[key]
                            })
                        }
                    }
                });

                let time = -100;
                if(this.activeBookingOptions.time){
                    time = this.activeBookingOptions.time.realTime ? parseInt(this.activeBookingOptions.time.realTime) : -100;
                }


                let body = {
                    productId: this.currentProduct.id,
//                    date: this.chosenDate ,
                    date: this.chosenDate ? moment(String(this.chosenDate)).format('YYYY-MM-DD') : '2019-11-22',
                    time: time,
                    travelers: this.travelers,
                    perPerson: perPerson,
                    arrival_flight_details: this.arrival_flight_details,
                    departure_flight_details: this.departure_flight_details,
                    arrival_ship_details: this.arrival_ship_details,
                    departure_ship_details: this.departure_ship_details,
                    arrival_train_details: this.arrival_train_details,
                    departure_train_details: this.departure_train_details
                }

                this.createBooking(body);
            },
            generateDateOfBirth(item){
               if(this.currentProduct.bookingNeededInformationFromTraveler.is_date_of_birth_needed){
                   let day = null;
                   if(item.day){
                       day = item.day.length < 2 ? '0' + item.day : item.day;
                   }else{
                       day = '01'
                   }
                   let month = null;
                   if(item.month){
                       month = item.month.length < 2 ? '0' + item.month : item.month;
                   }else{
                       month = '01'
                   }
                   let year = null;
                   if(item.year){
                       year = item.year.length < 2 ? '0' + item.year : item.year;
                   }else{
                       year = '1920'
                   }
                   const final = year + '-' + month + '-' + day;
                   return final;
               }else{
                   return null
               }
            },
            openDateModal(){
                this.showModal = true;
            },
            renderBtn(units) {
//                console.log("HOW MANY TIMES????")
                document.getElementById("paypal-button-container").innerHTML = "";
                this.showPayPalButton = false;
                let compContext = this;
                paypal.Buttons({
                    createOrder: function(data, actions) {
                        // Set up the transaction
                        return actions.order.create({
                            "purchase_units": [

                                units
                            ]
                        });
                    },
                    onApprove: function(data, actions) {
                        compContext.payPalLoading = true;
                        return fetch('https://api.travel.iteora.com/v1/bookings/save-paypal-order', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                orderId: data.orderID
                            })
                        }).then(function(res) {
                            compContext.$notify({
                                type: 'success',
                                group: 'bookings',
                                title: 'PayPal',
                                text: 'Payment has been successfully.',
                                duration: 3500,
                                speed: 1000
                            })
                            compContext.payPalLoading = false;
                            compContext.$router.push('/success/'+ compContext.paypalData.reference_id)
                        });
                    }
                }).render('#paypal-button-container');
            },
            getTravelers(){
                let count = 0;
                let compContext = this;
                Object.keys(this.activeBookingOptions.currentTourChosenGroups).forEach(function(key) {
                    count += compContext.activeBookingOptions.currentTourChosenGroups[key];
                });

                this.overallCount = count;



                if( count > this.travelers.length ){
                    let countToAdded = count - this.travelers.length;
                    for( var i = 0; i < countToAdded; i++ ){
                        this.travelers.push({
                            is_lead_traveler: false,
                            title: "",
                            first_name: "",
                            last_name: "",
                            email: "",
                            phone_country_id: 2,
                            phone_number: "",
                            date_of_birth: "",
                            gender: "",
                            nationality: "",
                            weight: 0,
                            passport_details: "231321312312"
                        })
                    }
                }
                if( count < this.travelers.length ){
                    this.travelers.splice(0, count);
                    if(count == 0){
                        this.travelers = [];
                    }
                }
                console.log(this.travelers, "TRAVELERS HERE WE GO!!!")
            },
            setNationality(val){
                this.travelers[val.index]['nationality'] = val.value;
            },
            setDay(val){
                this.travelers[val.index]['day'] = val.value;
            },
            setMonth(val){
                this.travelers[val.index]['month'] = val.value;
            },
            setYear(val){
                this.travelers[val.index]['year'] = val.value;
            },
            setPhoneIndex(val){
                this.travelers[val.index]['phone_country_id'] = val.value;
            },

        },
        created(){
            this.getChosenDate();
            this.getPhoneIndexes();
            //this.getPaymentMethods();
            this.$store.dispatch('products/getCurrentProductBooking', this.$route.params.id)
        },
        mounted(){
            this.getTravelers();
            this.nullPayPal();
            if(!this.chosenDate){
                this.$router.push('/tours/' + this.$route.params.id)
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '~assets/scss/module-variables';

    .main-container {
        display: flex;
        width: 100%;
        margin-left: 138px;
        height: auto;
        padding-bottom: 24px;
    }
    
    .left-block{
        width: 754px;
        float: left;
        margin-top: 34px;
        .main-title h1{
            font-size: 28px;
            color: #052e46;
            text-transform: capitalize;
        }
        .line{
            height: 1px;
            width: 100%;
            background-color: #e6edf1;
        }
        .points{
            margin-top: 28px;
            min-height: 186px;
            .point{
                .point-number{
                    float: left;
                    .point-number-square{
                        height: 32px;
                        width: 32px;
                        border: 2px solid #2980b9;
                        border-radius: 30px;
                        background-size: cover;
                        font-size: 13px;
                        color: #2980b9;
                        text-decoration: none solid rgb(41, 128, 185);
                        text-align: center;
                        padding-top: 3px;
                    }
                }
                .point-content{
                    float: left;
                    margin-left: 18px;
                    .content-title{
                        font-size: 24px;
                        color: #052e46;
                        line-height: 30px;
                    }
                    .content-dates{
                        margin-top: 20px;
                        .travel-date{
                            float: left;
                            .heading{
                                font-size: 13px;
                                color: #052e46;
                            }
                            .value{
                                font-size: 14px;
                                color: #052e46;
                                text-decoration: none solid rgb(5, 46, 70);
                                text-transform: capitalize;
                                font-weight: 700;
                            }
                        }
                        .end-date{
                            margin-left: 36px;
                            float: left;
                            .heading{
                                font-size: 13px;
                                color: #052e46;
                            }
                            .value{
                                font-size: 14px;
                                color: #052e46;
                                text-decoration: none solid rgb(5, 46, 70);
                                text-transform: capitalize;
                            }
                        }
                    }
                    .change-date{
                        margin-top: 8px;
                        line-height: 27px;
                        font-size: 13px;
                        color: #094c74;
                        cursor: pointer;
                    }
                    .info-block{
                        margin-top: 24px;
                        label{
                            font-size: 13px;
                            color: #052e46;
                            text-decoration: none solid rgb(5, 46, 70);
                            line-height: 20px;
                        }
                        .groups-numbers{
                            margin-top: 14px;
                            .modal-content-spinner{
                                float: left;
                                margin-right: 34px;
                            }
                        }
                    }
                    .pay-by-card{
                        .title-block{
                            margin-top: 20px;
                            height: 58px;
                            border: 1px solid #b5c9d5;
                            border-top-left-radius: 4px;
                            border-top-right-radius: 4px;
                            background-size: cover;
                            .left-card-block{
                                margin-left: 16px;
                                margin-top: 17px;
                                float: left;
                                input{
                                    float: left;
                                    opacity: 1;
                                    position: relative;
                                    margin-top: 5px;
                                }
                                .title{
                                    margin-left: 8px;
                                    font-size: 14px;
                                    color: #052e46;
                                    text-decoration: none solid rgb(5, 46, 70);
                                    float: left;
                                    font-weight: 600;
                                }
                            }
                            .right-card-block{
                                float: right;
                                .logos{
                                    margin-top: 16px;
                                    .card-logo{

                                    }
                                    .visa-logo{
                                        width: 38px;
                                        height: 26px;
                                        background: url("~assets/icons/visa.svg") no-repeat;
                                        background-size: cover;
                                        float: left;
                                        margin-right: 14px;
                                    }
                                    .mastercard-logo{
                                        width: 38px;
                                        height: 26px;
                                        background: url("~assets/icons/mastercard.svg") no-repeat;
                                        background-size: cover;
                                        float: left;
                                        margin-right: 14px;
                                    }
                                    .american-logo{
                                        width: 38px;
                                        height: 26px;
                                        background: url("~assets/icons/american.svg") no-repeat;
                                        background-size: cover;
                                        float: left;
                                        margin-right: 16px;
                                    }
                                    .paypal-logo{
                                        width: 38px;
                                        height: 26px;
                                        background: url("~assets/icons/paypal.svg") no-repeat;
                                        background-size: cover;
                                        float: left;
                                        margin-right: 16px;
                                    }
                                }
                            }
                        }
                        .contents-block{
                            height: 244px;
                            padding-top: 24px;
                            padding-left: 26px;
                            border: 1px solid #b5c9d5;
                            border-bottom-right-radius: 4px;
                            border-bottom-left-radius: 4px;
                            background-size: cover;
                            .card-input{
                                display: block;
                                width: 700px;
                                height: 40px;
                                margin-bottom: 12px;
                                .heading{
                                    float: left;
                                    width: 149px;
                                    font-size: 14px;
                                    color: #052e46;
                                    text-decoration: none solid rgb(5, 46, 70);
                                    margin-top: 10px;
                                }
                                .value{
                                    float: left;
                                }
                            }
                        }
                        .contents-block-paypal{
                            padding-top: 24px;
                            padding-left: 26px;
                            padding-bottom: 24px;
                            padding-right: 26px;
                            border: 1px solid #b5c9d5;
                            border-bottom-right-radius: 4px;
                            border-bottom-left-radius: 4px;
                            background-size: cover;
                            .paypal-button{
                                cursor: pointer;
                                margin: 0 auto;
                                width: 187px;
                                height: 40px;
                                padding: 9px 15px;
                                font-weight: 500;
                                border: 1px solid #2980b9;
                                border-radius: 2px;
                                background-color: #2980b9;
                                background-size: cover;
                                font-size: 13px;
                                color: #ffffff;
                                text-decoration: none solid rgb(255, 255, 255);
                                text-align: center;
                            }
                        }
                    }
                }
            }
            .pickup-point-content{
                width: 700px;
                .pickup-description{
                    width: 550px;
                    font-size: 13px;
                    color: #052e46;
                    text-decoration: none solid rgb(5, 46, 70);
                    margin-top: 14px;
                }
                .hotel-input{
                    margin-top: 12px;
                    height: 40px;
                    .hotel-input-heading{
                        float: left;
                        font-size: 13px;
                        color: #052e46;
                        margin-top: 10px;
                        width: 175px;
                    }
                    .hotel-input-input{
                        float: left;
                        width: 495px;
                    }
                }
                .hotel-line{
                    margin-top: 40px;
                    display: none;
                }
                .points-block-start{
                    overflow: auto;
                    margin-bottom: 40px;
                    .start-end-points{
                        font-size: 14px;
                        font-weight: 600;
                        span{
                            font-weight: normal;
                        }
                    }
                }

            }
        }
        .accept-terms{
            margin-top: 70px;
            height: 40px;
            input{
                transform: scale(1.5);
                float: left;
            }
            label{
                float: left;
                width: 657px;
                height: 40px;
                /* I accept Terms & ... */
                font-size: 14px;
                color: #052e46;
            }
        }
        .order-button-block{
            margin-top: 46px;
            .add-button{
                cursor: pointer;
                margin: 0 auto;
                padding-top: 4px;
                width: 311px;
                height: 50px;
                border-radius: 3px;
                background-color: #faab1a;
                background-size: cover;
                font-size: 14px;
                color: #041e2e;
                text-decoration: none solid rgb(4, 30, 46);
                text-align: center;
                margin-bottom: 88px;
                border: none;
                display: block;
            }
        }
        .lead-traveller-block{
            margin-left: 52px;
            margin-top: 20px;
            .traveller{
                .title{
                    font-size: 16px;
                    text-decoration: none solid rgb(5, 46, 70);
                    line-height: 20px;
                    font-weight: 500;
                }
                .traveller-input{
                    display: block;
                    width: 100%;
                    margin-top: 24px;
                    min-height: 40px;
                    .input-heading{
                        float: left;
                        font-size: 13px;
                        color: #052e46;
                        text-decoration: none solid rgb(5, 46, 70);
                        line-height: 20px;
                        width: 95px;
                        margin-right: 24px;
                    }
                    .radios{
                        float: left;
                        .radio{
                            float: left;
                            input{
                                float: left;
                            }
                            label{
                                float: left;
                                margin-right: 14px;
                            }
                        }
                    }
                    .text-input{
                        float: left;
                        width: 230px;
                    }
                    .text-input-heading{
                        margin-top: 10px;
                    }
                }
                .traveler-select{
                    width: 73px;
                    float: left;
                }
                .traveler-select-days{
                    width: 67px;
                    float: left;
                }
                .traveler-select-months{
                    margin-left: 6px;
                    width: 65px;
                    float: left;
                }
                .traveler-select-years{
                    margin-left: 6px;
                    width: 85px;
                    float: left;
                }
                .traveler-select-nationalities{
                    width: 230px;
                    float: left;
                }
                .select-text-input{
                    float: left;
                    width: 145px;
                    margin-left: 12px;
                }
                .bottom-line{
                    margin-top: 30px;
                }
            }
            .basic-traveller{
                margin-top: 20px;
            }
        }
    }
    
    .right-block{
        width: 362px;
        float: left;
        min-height: 675px;
        border: 1px solid #e6edf1;
        background-color: #ffffff;
        background-size: cover;
        padding: 24px;
        margin-left: 22px;
        margin-top: 109px;
        .main-title{
            height: 24px;
            font-weight: 600;
            font-size: 20px;
            color: #052e46;
            text-decoration: none solid rgb(5, 46, 70);
        }
        .secondary-title{
            margin-top: 20px;
            height: 41px;
            font-weight: 600;
            font-size: 14px;
            color: #052e46;
            text-decoration: none solid rgb(5, 46, 70);
            text-transform: capitalize;
        }
        .duration{
            height: 20px;
            font-size: 13px;
            color: #052e46;
            text-decoration: none solid rgb(5, 46, 70);
            line-height: 20px;
        }
        .start-end-block{
            margin-top: 12px;
            .start-block{
                height:56px;
                .start-svg-icon{
                    float: left;
                    background: url("~assets/icons/start.svg") no-repeat;
                    height: 24px;
                    width: 24px;
                    margin-top: 3px;
                }
                .heading{
                    float: left;
                    margin-left: 12px;
                    .heading-title{
                        height: 24px;
                        font-size: 14px;
                        color: #052e46;
                        text-decoration: none solid rgb(5, 46, 70);
                        font-weight: 500;
                    }
                    .heading-body{
                        height: 20px;
                        font-size: 13px;
                        color: #052e46;
                        text-decoration: none solid rgb(5, 46, 70);
                        line-height: 20px;
                    }
                }
            }
            .end-block{
                height:56px;
                .end-svg-icon{
                    float: left;
                    background: url("~assets/icons/end.svg") no-repeat;
                    height: 24px;
                    width: 24px;
                    margin-top: 3px;
                }
                .heading{
                    float: left;
                    margin-left: 12px;
                    .heading-title{
                        height: 24px;
                        font-size: 14px;
                        color: #052e46;
                        text-decoration: none solid rgb(5, 46, 70);
                        font-weight: 500;
                    }
                    .heading-body{
                        height: 20px;
                        font-size: 13px;
                        color: #052e46;
                        text-decoration: none solid rgb(5, 46, 70);
                        line-height: 20px;
                    }
                }

            }
        }
        .included-block{
            .included{
                .title{
                    height: 22px;
                    font-size: 14px;
                    color: #052e46;
                    text-decoration: none solid rgb(5, 46, 70);
                    text-transform: capitalize;
                    font-weight: 500;
                }
                .body{
                    height: 20px;
                    font-size: 13px;
                    color: #052e46;
                    text-decoration: none solid rgb(5, 46, 70);
                    line-height: 20px;
                }
            }
        }
        .right-line{
            width: 311px;
            height: 1px;
            stroke-width: 1;
            background-color: #e6edf1;
            margin-top: 20px;
        }
        .right-line-second{
            width: 311px;
            height: 1px;
            stroke-width: 1;
            background-color: #e6edf1;
        }
        .number-of-travelers{
            height: 66px;
            .heading{
                padding-top: 12px;
                .number-title {
                    float: left;
                    .number-title-heading{
                        height: 22px;
                        font-size: 14px;
                        color: #2980b9;
                        text-decoration: none solid rgb(41, 128, 185);
                        font-weight: 600;
                    }
                    .number-title-body{
                        height: 20px;
                        font-size: 13px;
                        color: #052e46;
                        text-decoration: none solid rgb(5, 46, 70);
                        line-height: 20px;
                    }
                }
                .number-number {
                    float: right;
                    font-size: 14px;
                    color: #2980b9;
                    text-decoration: none solid rgb(41, 128, 185);
                    font-weight: 600;
                }
            }
        }
        .tour-prices-block{
            .tour-price{
                height: 62px;
                padding-left: 14px;
               .left-price-block{
                   margin-top: 16px;
                   float: left;
                   .heading{
                       /* Tour price: */
                       font-size: 14px;
                       color: #052e46;
                       text-decoration: none solid rgb(5, 46, 70);
                   }
                   .body-block{
                       /* $1,000 x 2 */
                       font-size: 13px;
                       color: #6b94ac;
                       text-decoration: none solid rgb(107, 148, 172);
                   }
               }
               .right-price-block{
                   margin-right: 16px;
                   margin-top: 24px;
                   float: right;
                   height: 18px;
                   font-size: 14px;
                   color: #052e46;
                   text-decoration: none solid rgb(5, 46, 70);
               }
            }
            .ammount-due{
                height: 49px;
                border-radius: 4px;
                background-color: #2980b9;
                background-size: cover;
                padding-left: 14px;
                .left-price-block{
                    margin-top: 16px;
                    float: left;
                    .heading{
                        /* Tour price: */
                        font-size: 13px;
                        color: #ffffff;
                        text-decoration: none solid rgb(255, 255, 255);
                    }
                }
                .right-price-block{
                    margin-right: 16px;
                    margin-top: 16px;
                    font-size: 14px;
                    color: #ffffff;
                    text-decoration: none solid rgb(255, 255, 255);
                    float: right;
                    .price{
                        font-weight: 500;
                    }
                }
            }
            .ask-question{
                height: 27px;
                background-size: cover;
                font-size: 13px;
                color: #094c74;
                text-decoration: none solid rgb(9, 76, 116);
                text-align: center;
                margin-top: 12px;
                cursor: pointer;
            }
            .terms-and-condition{
                margin-top: 48px;
                .title{
                    font-weight: 500;
                    height: 16px;
                    font-size: 13px;
                    color: #052e46;
                    text-decoration: none solid rgb(5, 46, 70);
                }
                .description{
                    margin-top: 10px;
                    font-size: 13px;
                    color: #052e46;
                    text-decoration: none solid rgb(5, 46, 70);
                }
            }
        }
    }

    @media (max-width: 1190px) {

    }

    @media (max-width: 768px) {

    }

    @media (max-width: 550px) {

    }

    @media (max-width: 475px) {
        .left-block{
            width: 100%;
            .main-title{
                text-align: center;
            }
        }
        .right-block{
            margin-top: 20px;
            width: 100%;
            margin-left: 0px;
            margin-bottom: 20px;
            .terms-and-condition{
                margin-top: 20px;
            }
        }
        .text-input-heading {
            width: 100%;
        }
        .main-container{
            margin-left: 0px;
            padding-right: 20px;
            flex-direction: column;
            .points{
                min-height:initial;
                overflow: auto;
                .spinner{
                    margin-bottom: 5px;
                    width: 100%;
                }
                .point-content{
                    width: 80%;
                }
            }
            .lead-traveller-block{
                margin-left: 20px;
                .traveller{
                    overflow: auto;
                }
            }
            .content-dates{
                .travel-date{
                    //width: 100%;
                }
                .end-date{
                   margin-left: 15px;
                   // width: 100%;
                }
            }
            .order-button-block{
                margin-top: 20px;
                .add-button{
                    margin-bottom: 0px;
                }
            }
            .info-block{
                width: 80%;
            }
        }
        .line{
            display: none;
        }

        .lead-traveller-block{
            .traveller-input{
                .input-heading{
                    width: 100% !important;
                }
            }
            .select-text-input{
                margin-bottom: 10px;
            }
        }
        .pickup-description{
            width: 100%;
        }
        .pay-by-card .contents-block-paypal{
            margin-left: 0px;
        }
        .pay-by-card{
            width: 100% !important;
        }
        .left-block .accept-terms label{
            width: 80% !important;
        }
        .pickup-point-content{
            width: 80%;
            .pickup-description{
                width: 100% !important;
            }
            .hotel-input-input{
                width: 100% !important;
            }
        }
        .accept-terms{
            margin-top: 20px !important;
            overflow: auto;
            height: 82px !important;
            margin-left: 50px;
        }
    }

    //Styles for modal
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

    .review,
    .address {
        font-size: 14px;
        color: $blue-dark;
    }

    .reviews {
        color: #6b94ac;
        display: flex;
        align-items: center;
        margin-top: 2px;
        font-size: 14px;
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

    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .review-header-left {
        display: flex;
    }

    .review-header-left-text,
    .rw-comment-name {
        font-size: 14px;
        font-weight: 500;
        margin-top: 4px;
    }

    .review-header-button {
        margin-top: -10px;
        width: 201px;
    }

    .review-bottom-button {
        width: 201px;
    }

    .review-list {
        width: 500px;
        margin-top: 19px;

    }

    .review-list-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .review-assessment-cont {
        border-radius: 2px;
        height: 10px;
        max-width: 302px;
        width: 100%;
        background-color: #e6edf1;
    }

    .review-assessment-percent {
        background-color: $orange;
        height: 10px;
        border-radius: 2px;
    }

    .review-list-name {
        width: 89px;
        font-size: 14px;
        color: $dark-secondary;
    }

    .review-comments-list {
        padding-top: 10px;
        margin-top: 30px;
        border-top: 1px solid #e6edf1;
    }

    .review-comments-item {
        margin-top: 20px;
    }

    .review-percent {
        color: $dark-secondary;
        font-size: 14px;
        margin-left: 16px;
    }

    .rw-comment-head {
        display: flex;
    }

    .rw-comment-desc {
        font-size: 14px;
    }

    .rw-comment-date {
        font-size: 14px;
        margin-top: 5px;
    }

    .review-wrapper-button {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 30px;
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

        .review-list {
            width: 100%;
        }

        .back-to-search {
            width: 166px;
        }

        .like-cont, .customer-cont {
            margin-top: 20px;
        }

        .review-wrapper-button {
            margin-top: 10px;
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
    .bold-text{
        font-weight: 700;
    }
    .unique-block{
        margin-bottom: 20px;
    }

    #black-credit-card-button{
        display: none;
    }
    
    .traveler-info-block{
        overflow: auto;
    }

</style>
